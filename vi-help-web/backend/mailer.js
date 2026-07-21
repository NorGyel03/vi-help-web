/**
 * VIHelp Mailer — powered by Resend (resend.com)
 *
 * SETUP (2 minutes):
 *   1. Sign up at https://resend.com (free — 3,000 emails/month)
 *   2. Go to API Keys → Create API Key → copy it
 *   3. Paste it as RESEND_API_KEY in your .env file
 *
 * FROM ADDRESS:
 *   - Without a verified domain: emails come from "onboarding@resend.dev"
 *     (Resend's shared domain). This works immediately, no setup needed.
 *   - With a verified domain (later): set RESEND_FROM in .env to e.g.
 *     "VIHelp <hello@vihelp.bt>" after adding DNS records in Resend dashboard.
 */

const RESEND_API = "https://api.resend.com/emails";

/**
 * Send an email via Resend.
 * Falls back to console.log if RESEND_API_KEY is not set.
 *
 * @param {object} opts
 * @param {string}   opts.to        Recipient email
 * @param {string}   opts.subject   Email subject
 * @param {string}   opts.html      HTML body
 * @param {string}  [opts.text]     Plain-text fallback
 * @param {string}  [opts.replyTo]  Reply-to address
 */
async function sendMail({ to, subject, html, text, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM || "VIHelp <onboarding@resend.dev>";

  // Dev mode — no API key configured yet
  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.log("\n📧 [DEV EMAIL — not sent, RESEND_API_KEY not set]");
    console.log("  From   :", from);
    console.log("  To     :", to);
    console.log("  Subject:", subject);
    if (text) console.log("  Body   :", text.substring(0, 200));
    console.log();
    return { id: "dev-mode" };
  }

  const body = {
    from,
    to: [to],
    subject,
    html,
  };
  if (text) body.text = text;
  if (replyTo) body.reply_to = replyTo;

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${data.message || JSON.stringify(data)}`);
  }

  console.log(`✉️  Email sent → ${to} (id: ${data.id})`);
  return data;
}

module.exports = { sendMail };
