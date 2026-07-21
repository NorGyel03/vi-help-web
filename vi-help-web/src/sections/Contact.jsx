import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/**
 * EMAILJS SETUP (Free — no backend needed)
 * ─────────────────────────────────────────
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an Email Service (Gmail recommended) → copy your SERVICE_ID
 * 3. Create an Email Template with these variables:
 *       {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *    → copy your TEMPLATE_ID
 * 4. Go to Account → Public Key → copy your PUBLIC_KEY
 * 5. Replace the three placeholder values below.
 */
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const headerRef = useScrollAnimation();
  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { ...form },
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ from_name: "", from_email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
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
                <label htmlFor="from_name">Your Name</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  placeholder="Norbu Gyeltshen"
                  value={form.from_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="from_email">Email Address</label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  placeholder="norbu@example.com"
                  value={form.from_email}
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
                placeholder="Tell us how you'd like to work with VIHelp..."
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
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <div className="form-message success">
                ✅ Message sent! We'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="form-message error">
                ❌ Something went wrong. Please email us directly at vihelp.ai@gmail.com
              </div>
            )}

            {/* Setup reminder — remove once EmailJS is configured */}
            {EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" && (
              <div className="form-message" style={{ background: "rgba(234,179,8,0.12)", border: "1px solid rgba(234,179,8,0.3)", color: "#fde68a", marginTop: "12px" }}>
                ⚠️ EmailJS not yet configured. See the comment at the top of Contact.jsx to set it up.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
