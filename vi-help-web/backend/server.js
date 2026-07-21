require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const contactRoutes = require("./routes/contact");
const waitlistRoutes = require("./routes/waitlist");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ─────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5174", // vite alternate port
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve admin dashboard static files
app.use(express.static(path.join(__dirname, "public")));

// ── API Routes ─────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/waitlist", waitlistRoutes);
app.use("/api/admin", adminRoutes);

// ── Admin dashboard page ───────────────────────────────
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ── Health check ───────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ── 404 handler ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// ── Start ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 VIHelp backend running at http://localhost:${PORT}`);
  console.log(`   Admin dashboard → http://localhost:${PORT}/admin`);
  console.log(`   API health     → http://localhost:${PORT}/api/health`);

  const key = process.env.RESEND_API_KEY;
  if (key && key !== "re_your_api_key_here") {
    console.log(`   ✅ Resend API key loaded (${key.slice(0, 8)}...)\n`);
  } else {
    console.log(`   ⚠️  RESEND_API_KEY not set — emails will log to console only\n`);
  }
});
