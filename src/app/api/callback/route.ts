import { NextResponse } from "next/server";

type CallbackPayload = {
  name?: string;
  phone?: string;
  preferredTime?: string;
  message?: string;
  website?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }
  return digits;
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

  const digits = normalizePhone(phone);
  if (digits.length !== 10) {
    return NextResponse.json(
      { error: "Please enter a valid 10-digit phone number." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CALLBACK_TO_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Top Dog Website <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        error:
          "Callback requests are not configured yet. Please call the shop directly.",
      },
      { status: 503 },
    );
  }

  const subject = `Callback request from ${name}`;
  const html = `
    <h2>New callback request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Best time to call:</strong> ${escapeHtml(preferredTime)}</p>
    <p><strong>Vehicle / issue:</strong></p>
    <p>${escapeHtml(message)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
      replyTo: toEmail,
    }),
  });

  if (!response.ok) {
    console.error("Resend error:", await response.text());
    return NextResponse.json(
      { error: "Unable to send your request right now. Please call the shop." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
