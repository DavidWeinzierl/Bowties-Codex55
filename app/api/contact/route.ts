import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid form data", fields: parsed.error.flatten().fieldErrors }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Mail service not configured" }, { status: 503 });
    console.info("Development enquiry", parsed.data);
    return NextResponse.json({ ok: true, delivered: false }, { status: 202 });
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const { name, email, eventDate, eventType, message } = parsed.data;
    await transport.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Website enquiry: ${eventType} · ${eventDate}`,
      text: `Name: ${name}\nEmail: ${email}\nDate: ${eventDate}\nEvent: ${eventType}\n\n${message}`,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Contact delivery failed", error);
    return NextResponse.json({ error: "Message delivery failed" }, { status: 502 });
  }
}
