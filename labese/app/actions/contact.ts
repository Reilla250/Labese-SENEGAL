"use server";

import { contactSchema } from "@/lib/contact-schema";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

// Very small in-memory rate limiter (per server instance). This is a
// best-effort mitigation suitable for a serverless/edge deployment where a
// dedicated rate-limiting service is not configured; it resets on redeploy.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(key: string) {
  const now = Date.now();
  const timestamps = (submissionLog.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(value: string) {
  // Strip control characters and angle brackets to reduce injection risk in
  // downstream email/log rendering. Real HTML escaping happens wherever the
  // value is rendered.
  return value.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    organisation: String(formData.get("organisation") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    reason: String(formData.get("reason") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") === "on",
    website: String(formData.get("website") ?? ""), // honeypot
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors, message: "Please correct the errors below." };
  }

  // Honeypot triggered: silently pretend success so bots gain no signal.
  if (parsed.data.website) {
    return { status: "success" };
  }

  const rateKey = parsed.data.email.toLowerCase();
  if (isRateLimited(rateKey)) {
    return {
      status: "error",
      message: "Too many submissions received. Please try again later.",
    };
  }

  const clean = {
    fullName: sanitize(parsed.data.fullName),
    organisation: parsed.data.organisation ? sanitize(parsed.data.organisation) : "",
    email: sanitize(parsed.data.email),
    phone: parsed.data.phone ? sanitize(parsed.data.phone) : "",
    reason: sanitize(parsed.data.reason),
    message: sanitize(parsed.data.message),
  };

  try {
    await deliverEnquiry(clean);
  } catch {
    return {
      status: "error",
      message: "We could not send your message right now. Please try again shortly.",
    };
  }

  return { status: "success" };
}

// Delivery is intentionally abstracted so a real transactional-email
// provider can be wired in via environment variables without touching the
// form UI. No API keys or credentials live in client code.
async function deliverEnquiry(data: {
  fullName: string;
  organisation: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}) {
  const apiKey = process.env.EMAIL_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL ?? "info@labese.org";

  if (!apiKey) {
    // No email provider configured yet — log server-side only, never to the
    // client, and never persist sensitive form contents beyond what's needed
    // to action the enquiry.
    console.info(`[contact] New enquiry for ${contactEmail} from ${data.email} (${data.reason})`);
    return;
  }

  // Example integration point for a provider such as Resend/Postmark/SendGrid:
  // await fetch("https://api.example-email-provider.com/v1/send", {
  //   method: "POST",
  //   headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  //   body: JSON.stringify({ to: contactEmail, subject: `LABESE enquiry: ${data.reason}`, ...data }),
  // });
}
