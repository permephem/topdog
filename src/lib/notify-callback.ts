export type CallbackRequest = {
  name: string;
  phone: string;
  preferredTime: string;
  message: string;
  phoneDigits: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatSmsBody(request: CallbackRequest) {
  const urgent = request.preferredTime.startsWith("ASAP");
  const lines = [
    urgent ? "URGENT Top Dog CALLBACK" : "Top Dog CALLBACK",
    `${request.name} — ${request.phone}`,
    `Call back: ${request.preferredTime}`,
  ];

  if (request.message !== "No details provided.") {
    const issue =
      request.message.length > 120
        ? `${request.message.slice(0, 117)}...`
        : request.message;
    lines.push(issue);
  }

  return lines.join("\n");
}

export async function sendCallbackEmail(
  request: CallbackRequest,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CALLBACK_TO_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Top Dog Website <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return false;
  }

  const telHref = `tel:+1${request.phoneDigits}`;
  const urgent = request.preferredTime.startsWith("ASAP");
  const subject = urgent
    ? `[URGENT CALLBACK] ${request.name} — ${request.phone}`
    : `[CALLBACK] ${request.name} — ${request.phone}`;
  const html = `
    <h2 style="margin:0 0 12px;font-family:sans-serif;">New callback request</h2>
    <p style="font-family:sans-serif;font-size:18px;margin:0 0 16px;">
      <a href="${telHref}" style="color:#d97706;font-weight:bold;text-decoration:none;">
        Tap to call ${escapeHtml(request.phone)}
      </a>
    </p>
    <p style="font-family:sans-serif;margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(request.name)}</p>
    <p style="font-family:sans-serif;margin:0 0 8px;"><strong>Phone:</strong> ${escapeHtml(request.phone)}</p>
    <p style="font-family:sans-serif;margin:0 0 8px;"><strong>Best time to call:</strong> ${escapeHtml(request.preferredTime)}</p>
    <p style="font-family:sans-serif;margin:0 0 8px;"><strong>Vehicle / issue:</strong></p>
    <p style="font-family:sans-serif;margin:0;">${escapeHtml(request.message)}</p>
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
      headers: {
        "X-Priority": "1",
        Importance: "high",
      },
    }),
  });

  if (!response.ok) {
    console.error("Resend error:", await response.text());
    return false;
  }

  return true;
}

export async function sendCallbackSms(
  request: CallbackRequest,
): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const smsTo = process.env.CALLBACK_SMS_TO;

  if (!accountSid || !authToken || !fromNumber || !smsTo) {
    return false;
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: smsTo,
        From: fromNumber,
        Body: formatSmsBody(request),
      }),
    },
  );

  if (!response.ok) {
    console.error("Twilio error:", await response.text());
    return false;
  }

  return true;
}

export async function notifyCallbackRequest(
  request: CallbackRequest,
): Promise<{ email: boolean; sms: boolean }> {
  const [email, sms] = await Promise.all([
    sendCallbackEmail(request),
    sendCallbackSms(request),
  ]);

  return { email, sms };
}
