const router = require("express").Router();
const db = require("../db");
const { sendMail } = require("../mailer");

// ── POST /api/contact ──────────────────────────────────
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message too long (max 5000 chars)." });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  // Save to database
  const stmt = db.prepare(
    `INSERT INTO contacts (name, email, subject, message, ip) VALUES (?, ?, ?, ?, ?)`
  );
  const result = stmt.run(name.trim(), email.trim().toLowerCase(), subject.trim(), message.trim(), ip);

  // Send notification email to VIHelp team
  const notifyHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;padding:32px;border-radius:12px;">
      <h2 style="color:#818cf8;margin-top:0;">📬 New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#94a3b8;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${escHtml(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0"><a href="mailto:${escHtml(email)}" style="color:#818cf8">${escHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8">Subject</td><td style="padding:8px 0">${escHtml(subject)}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${escHtml(message)}</td></tr>
      </table>
      <hr style="border:1px solid #1e293b;margin:24px 0"/>
      <p style="color:#475569;font-size:13px;margin:0">Submission ID: ${result.lastInsertRowid} · ${new Date().toUTCString()}</p>
    </div>
  `;

  // Send auto-reply to the person who contacted
  const autoReplyHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;padding:32px;border-radius:12px;">
      <h2 style="color:#818cf8;margin-top:0;">Thanks for reaching out, ${escHtml(name)}!</h2>
      <p style="color:#94a3b8;line-height:1.7">We've received your message and will get back to you within <strong style="color:#e2e8f0">1–2 business days</strong>.</p>
      <div style="background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:16px;margin:24px 0;">
        <p style="margin:0 0 8px;color:#475569;font-size:13px">Your message:</p>
        <p style="margin:0;color:#cbd5e1;white-space:pre-wrap;font-size:14px">${escHtml(message)}</p>
      </div>
      <p style="color:#94a3b8;line-height:1.7">In the meantime, feel free to reach us directly at <a href="mailto:vihelp.ai@gmail.com" style="color:#818cf8">vihelp.ai@gmail.com</a> or call <a href="tel:+97517263821" style="color:#818cf8">+975 17263821</a>.</p>
      <hr style="border:1px solid #1e293b;margin:24px 0"/>
      <p style="color:#475569;font-size:13px;margin:0">VIHelp · BITC Center, Thimphu TechPark, Bhutan</p>
    </div>
  `;

  try {
    // Always send the notification to the VIHelp team
    await sendMail({
      to: process.env.NOTIFY_EMAIL || "vihelp.ai@gmail.com",
      subject: `[VIHelp Contact] ${subject}`,
      html: notifyHtml,
      text: `New contact from ${name} (${email})\n\nSubject: ${subject}\n\n${message}`,
      replyTo: email, // hitting Reply in Gmail goes straight to the sender
    });
  } catch (err) {
    console.error("Notification email error:", err.message);
  }

  // Auto-reply to submitter — only works once you have a verified domain in Resend.
  // Until then, the team notification above still works fine.
  if (process.env.RESEND_FROM) {
    try {
      await sendMail({
        to: email,
        subject: "We received your message — VIHelp",
        html: autoReplyHtml,
        text: `Hi ${name},\n\nThanks for reaching out! We'll get back to you within 1–2 business days.\n\nYour message:\n${message}\n\n— The VIHelp Team`,
      });
    } catch (err) {
      console.error("Auto-reply email error:", err.message);
    }
  }

  res.status(201).json({
    success: true,
    message: "Message received! We'll be in touch soon.",
    id: result.lastInsertRowid,
  });
});

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = router;
