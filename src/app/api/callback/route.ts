import { NextResponse } from "next/server";
import { queueCallbackAlert } from "@/lib/callback-store";
import { notifyCallbackRequest } from "@/lib/notify-callback";
import { isShopDisplayEnabled } from "@/lib/shop-auth";

type CallbackPayload = {
  name?: string;
  phone?: string;
  preferredTime?: string;
  message?: string;
  website?: string;
};

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }
  return digits;
}

function isNotifyConfigured() {
  const hasEmail =
    Boolean(process.env.RESEND_API_KEY) &&
    Boolean(process.env.CALLBACK_TO_EMAIL);
  const hasSms =
    Boolean(process.env.TWILIO_ACCOUNT_SID) &&
    Boolean(process.env.TWILIO_AUTH_TOKEN) &&
    Boolean(process.env.TWILIO_FROM_NUMBER) &&
    Boolean(process.env.CALLBACK_SMS_TO);

  return hasEmail || hasSms;
}

export async function POST(request: Request) {
  let payload: CallbackPayload;

  try {
    payload = (await request.json()) as CallbackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const name = payload.name?.trim();
  const phone = payload.phone?.trim();
  const preferredTime = payload.preferredTime?.trim() || "Anytime";
  const message = payload.message?.trim() || "No details provided.";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }

  if (!phone) {
    return NextResponse.json({ error: "Please enter your phone number." }, { status: 400 });
  }

  const phoneDigits = normalizePhone(phone);
  if (phoneDigits.length !== 10) {
    return NextResponse.json(
      { error: "Please enter a valid 10-digit phone number." },
      { status: 400 },
    );
  }

  const requestData = {
    name,
    phone,
    preferredTime,
    message,
    phoneDigits,
  };

  const canNotify = isNotifyConfigured();
  const canQueue = isShopDisplayEnabled();

  if (!canNotify && !canQueue) {
    return NextResponse.json(
      {
        error:
          "Callback requests are not configured yet. Please call the shop directly.",
      },
      { status: 503 },
    );
  }

  let queued = false;
  if (canQueue) {
    try {
      await queueCallbackAlert(requestData);
      queued = true;
    } catch (error) {
      console.error("Shop alert queue error:", error);
    }
  }

  let notified = false;
  if (canNotify) {
    const { email, sms } = await notifyCallbackRequest(requestData);
    notified = email || sms;
  }

  if (!queued && !notified) {
    return NextResponse.json(
      { error: "Unable to send your request right now. Please call the shop." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
