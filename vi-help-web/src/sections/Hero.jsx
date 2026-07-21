import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const items = [titleRef, subRef, actionsRef, statsRef];
    items.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.style.opacity = "0";
      ref.current.style.transform = "translateY(24px)";
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        ref.current.style.opacity = "1";
        ref.current.style.transform = "translateY(0)";
      }, 150 + i * 130);
    });
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="hero">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div ref={titleRef}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Built in Bhutan · Powered by AI
          </div>

          <h1 className="hero-title">
            Real-time AI Guidance
            <br />
            for the{" "}
            <span className="gradient-text">Visually Impaired</span>
          </h1>
        </div>

        <p className="hero-sub" ref={subRef}>
          VIHelp turns a wearable camera into a personal guide — delivering
          instant, spoken descriptions of the world around you. Independence,
          finally within reach.
        </p>

        <div className="hero-actions" ref={actionsRef}>
          <button className="btn-primary" onClick={() => scrollTo("reach")}>
            Get Early Access
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn-secondary" onClick={() => scrollTo("prototype")}>
            See How It Works
          </button>
        </div>

        {/* Stats bar */}
        <div className="hero-stats" ref={statsRef}>
          <div className="hero-stat">
            <div className="hero-stat-num">253M+</div>
            <div className="hero-stat-label">Visually impaired globally</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">&lt;2s</div>
            <div className="hero-stat-label">Real-time AI response</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">100%</div>
            <div className="hero-stat-label">Voice-first, hands-free</div>
          </div>
        </div>
      </div>
    </section>
  );
}
