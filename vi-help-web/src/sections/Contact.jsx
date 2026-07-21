import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Update this to your deployed backend URL in production.
// For local dev this works as-is (Vite runs on :5173, backend on :3001).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const headerRef = useScrollAnimation();
  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Could not connect to the server. Please email us directly.");
    }
  };

  return (
    <section id="reach" className="section">
      <div className="container">
        <div className="fade-up" ref={headerRef}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let's build the future{" "}
            <span className="gradient-text">together</span>
          </h2>
          <p className="section-subtitle">
            Interested in collaborating, investing, testing, or supporting
            VIHelp? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info-block fade-left" ref={leftRef}>
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <div className="contact-item-text">
                <h4>Email</h4>
                <a href="mailto:vihelp.ai@gmail.com">vihelp.ai@gmail.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div className="contact-item-text">
                <h4>Phone</h4>
                <a href="tel:+97517263821">+975 17263821</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div className="contact-item-text">
                <h4>Location</h4>
                <p>BITC Center, Thimphu TechPark Limited</p>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px" }}>
                  Wangchutaba, Thimphu, Bhutan
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">🕘</div>
              <div className="contact-item-text">
                <h4>Office Hours</h4>
                <p>Mon – Fri, 9:00 AM – 5:00 PM (BST)</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form fade-right" ref={rightRef} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Norbu Gyeltshen"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="norbu@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Partnership / Investment / Testing / Other"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us how you'd like to work with VIHelp…"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>

            {status === "success" && (
              <div className="form-message success">
                ✅ Message sent! We'll get back to you within 1–2 business days.
              </div>
            )}
            {status === "error" && (
              <div className="form-message error">
                ❌ {errorMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
