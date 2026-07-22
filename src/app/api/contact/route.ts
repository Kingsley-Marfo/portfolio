import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  // honeypot — real users never fill this
  company?: string;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Best-effort in-memory rate limit: 3 submissions per IP per 10 minutes.
 * This resets on cold start (serverless functions aren't long-lived), so it
 * isn't a hard guarantee — but it's a real, free deterrent against a script
 * hammering the endpoint within a warm instance, with no extra infra.
 */
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bot trap
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const subject = body.subject?.trim();
  const message = body.message?.trim();

  const errors: Record<string, string> = {};
  if (!name || name.length < 2) errors.name = "Please enter your name.";
  if (!email || !emailRe.test(email)) errors.email = "Please enter a valid email.";
  if (!message || message.length < 10)
    errors.message = "Please include a little more detail.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO || gmailUser || siteConfig.email;

  // If Gmail SMTP is configured, deliver the enquiry. Create an App Password
  // at https://myaccount.google.com/apppasswords and set GMAIL_USER /
  // GMAIL_APP_PASSWORD in your environment (.env.local locally, Vercel env in prod).
  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"${siteConfig.name} — Portfolio" <${gmailUser}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: subject
          ? `[Portfolio] ${subject}`
          : `[Portfolio] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "(none)"}\n\n${message}`,
        html: `
          <div style="font-family:system-ui,sans-serif;line-height:1.6">
            <h2 style="margin:0 0 12px">New portfolio enquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name!)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email!)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
            <p style="white-space:pre-wrap">${escapeHtml(message!)}</p>
          </div>`,
      });

      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] email delivery failed", err);
      return NextResponse.json(
        { error: "Could not send your message. Please email me directly." },
        { status: 502 }
      );
    }
  }

  // Fallback (no SMTP configured): log server-side so nothing is lost in dev.
  console.info("[contact] enquiry received (SMTP not configured)", {
    name,
    email,
    subject: subject || "(no subject)",
  });

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
