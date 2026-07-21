const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const { requireAdmin } = require("../middleware/auth");

const JWT_SECRET = () => process.env.JWT_SECRET || "dev_secret";
const TOKEN_TTL = "8h";

// ── POST /api/admin/login ──────────────────────────────
router.post("/login", (req, res) => {
  const { password } = req.body;
  const correct = process.env.ADMIN_PASSWORD || "vihelp_admin";

  if (!password || password !== correct) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET(), { expiresIn: TOKEN_TTL });
  res.json({ token, expiresIn: TOKEN_TTL });
});

// ── GET /api/admin/contacts ────────────────────────────
router.get("/contacts", requireAdmin, (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page)  || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;
  const search = req.query.search ? `%${req.query.search}%` : null;

  let rows, total;
  if (search) {
    rows  = db.prepare(`SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? OR subject LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(search, search, search, limit, offset);
    total = db.prepare(`SELECT COUNT(*) as c FROM contacts WHERE name LIKE ? OR email LIKE ? OR subject LIKE ?`).get(search, search, search).c;
  } else {
    rows  = db.prepare(`SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(limit, offset);
    total = db.prepare(`SELECT COUNT(*) as c FROM contacts`).get().c;
  }

  res.json({ contacts: rows, total, page, limit });
});

// ── PATCH /api/admin/contacts/:id/read ────────────────
router.patch("/contacts/:id/read", requireAdmin, (req, res) => {
  db.prepare("UPDATE contacts SET read = 1 WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// ── DELETE /api/admin/contacts/:id ────────────────────
router.delete("/contacts/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM contacts WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// ── GET /api/admin/waitlist ────────────────────────────
router.get("/waitlist", requireAdmin, (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page)  || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 50);
  const offset = (page - 1) * limit;

  const rows  = db.prepare(`SELECT * FROM waitlist ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(limit, offset);
  const total = db.prepare(`SELECT COUNT(*) as c FROM waitlist`).get().c;

  res.json({ waitlist: rows, total, page, limit });
});

// ── DELETE /api/admin/waitlist/:id ────────────────────
router.delete("/waitlist/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM waitlist WHERE id = ?").run(req.params.id);
  res.json({ success: true });
});

// ── GET /api/admin/stats ───────────────────────────────
router.get("/stats", requireAdmin, (req, res) => {
  const totalContacts  = db.prepare("SELECT COUNT(*) as c FROM contacts").get().c;
  const unreadContacts = db.prepare("SELECT COUNT(*) as c FROM contacts WHERE read = 0").get().c;
  const totalWaitlist  = db.prepare("SELECT COUNT(*) as c FROM waitlist").get().c;
  const todayContacts  = db.prepare("SELECT COUNT(*) as c FROM contacts WHERE DATE(created_at) = DATE('now')").get().c;
  const todayWaitlist  = db.prepare("SELECT COUNT(*) as c FROM waitlist WHERE DATE(created_at) = DATE('now')").get().c;

  res.json({ totalContacts, unreadContacts, totalWaitlist, todayContacts, todayWaitlist });
});

module.exports = router;
