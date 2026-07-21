import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error' | 'duplicate'
  const [msg, setMsg] = useState("");

  const ref = useScrollAnimation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setMsg("");

    try {
      const res = await fetch(`${API_URL}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });

      const data = await res.json();
      setMsg(data.message || "");

      if (res.status === 409) {
        setStatus("duplicate");
      } else if (res.ok && data.success) {
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Could not connect to server. Please try again.");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner fade-up" ref={ref}>
          <div className="newsletter-text">
            <span className="section-label">Early Access</span>
            <h2 className="section-title" style={{ marginBottom: "10px" }}>
              Be the first to{" "}
              <span className="gradient-text">experience VIHelp</span>
            </h2>
            <p className="section-subtitle">
              Join our waitlist and we'll notify you the moment our beta opens.
              No spam — just one email when we're ready.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            {status !== "success" ? (
              <>
                <div className="newsletter-inputs">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="newsletter-input"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === "sending"}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {status === "sending" ? "Joining…" : "Join Waitlist →"}
                  </button>
                </div>

                {status === "duplicate" && (
                  <p className="newsletter-msg duplicate">
                    🎉 You're already on the list! We'll be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p className="newsletter-msg error">❌ {msg}</p>
                )}
              </>
            ) : (
              <div className="newsletter-success">
                <span style={{ fontSize: "32px" }}>🎉</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>
                    You're on the waitlist!
                  </p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                    {msg || "We'll email you as soon as the beta is ready."}
                  </p>
                </div>
              </div>
            )}

            <p className="newsletter-note">
              🔒 No spam. Unsubscribe any time. Your email is never shared.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
