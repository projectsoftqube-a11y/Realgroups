import { NextResponse } from "next/server";

/**
 * Contact form handler.
 *
 * Delivery is via Resend's REST API — called with plain fetch, so there is no
 * extra dependency to install.
 *
 * The recipient defaults to the address below; only the API key is required to
 * switch delivery on. Put it in `.env.local`:
 *
 *   RESEND_API_KEY=re_xxxxxxxx
 *   CONTACT_FROM="Real Group <website@realgroups.in>"   # optional override
 *   CONTACT_TO=someone.else@example.com                 # optional override
 *
 * Until the key is set the endpoint returns 503 with a clear message rather
 * than pretending the message was delivered.
 */

/** Where enquiries go unless CONTACT_TO overrides it. */
const DEFAULT_TO = "realgrouprajkot@gmail.com";

/**
 * Resend only accepts a `from` on a domain you have verified with them.
 * `onboarding@resend.dev` is their shared sandbox sender — it works without any
 * DNS setup but can ONLY deliver to the address that owns the Resend account.
 * Verify realgroups.in and set CONTACT_FROM to send to anyone.
 */
const DEFAULT_FROM = "Real Group Website <onboarding@resend.dev>";

const MAX = { name: 120, email: 200, message: 4000 };

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field, humans never see this one.
  if (clean(payload.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const message = clean(payload.message, MAX.message);

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || DEFAULT_TO;
  const from = process.env.CONTACT_FROM || DEFAULT_FROM;

  if (!apiKey) {
    console.warn(
      `[contact] RESEND_API_KEY is not set — enquiry NOT delivered to ${to}.`,
      { name, email, message },
    );
    return NextResponse.json(
      {
        error:
          "The contact form is not connected to an inbox yet. Please call us on 9586555564 in the meantime.",
      },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Website enquiry from ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        "",
        message || "(no message)",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend rejected the message:", await res.text());
    return NextResponse.json(
      { error: "We could not send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
