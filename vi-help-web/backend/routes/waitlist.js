const router = require("express").Router();
const db = require("../db");
const { sendMail } = require("../mailer");

// ── POST /api/waitlist ─────────────────────────────────
router.post("/", async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name ? name.trim() : null;

  // Check for duplicate
  const existing = db.prepare("SELECT id FROM waitlist WHERE email = ?").get(cleanEmail);
  if (existing) {
    return res.status(409).json({
      success: false,
      message: "You're already on the waitlist! We'll be in touch.",
    });
  }

  // Insert
  const result = db
    .prepare("INSERT INTO waitlist (email, name) VALUES (?, ?)")
    .run(cleanEmail, cleanName);

  // Notify team (always works — sends to your own Resend account email)
  sendMail({
    to: process.env.NOTIFY_EMAIL || "vihelp.ai@gmail.com",
    subject: `[VIHelp Waitlist] New signup: ${cleanEmail}`,
    html: `<p>New waitlist signup:<br><strong>${cleanName || "(no name)"}</strong> — <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>`,
    text: `New waitlist signup: ${cleanName || "(no name)"} — ${cleanEmail}`,
  }).catch(() => {});

  // Welcome email to subscriber — only works once RESEND_FROM domain is verified
  const welcomeHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;padding:32px;border-radius:12px;">
      <h2 style="color:#818cf8;margin-top:0;">You're on the VIHelp waitlist! 🎉</h2>
      <p style="color:#94a3b8;line-height:1.7">
        Thank you${cleanName ? `, <strong style="color:#e2e8f0">${escHtml(cleanName)}</strong>` : ""},
        for signing up for early access to VIHelp — AI-powered navigation for the visually impaired.
      </p>
      <p style="color:#94a3b8;line-height:1.7">
        We'll let you know as soon as we're ready to open the beta. You'll be among the first to try it.
      </p>
      <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
        <p style="margin:0;font-weight:700;font-size:16px;">Independence, finally within reach.</p>
      </div>
      <p style="color:#94a3b8;line-height:1.7">Questions? Reach us at <a href="mailto:vihelp.ai@gmail.com" style="color:#818cf8">vihelp.ai@gmail.com</a></p>
      <hr style="border:1px solid #1e293b;margin:24px 0"/>
      <p style="color:#475569;font-size:12px;margin:0">VIHelp · BITC Center, Thimphu TechPark, Bhutan<br>You're receiving this because you signed up at vihelp.ai</p>
    </div>
  `;

  if (process.env.RESEND_FROM) {
    sendMail({
      to: cleanEmail,
      subject: "You're on the VIHelp waitlist 🎉",
      html: welcomeHtml,
      text: `Thanks for signing up for VIHelp early access! We'll reach out as soon as the beta is ready.\n\n— The VIHelp Team`,
    }).catch(() => {});
  }

  res.status(201).json({
    success: true,
    message: "You're on the list! We'll reach out when the beta is ready.",
    id: result.lastInsertRowid,
  });
});

function escHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

module.exports = router;
