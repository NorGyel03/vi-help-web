import { useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const steps = [
  {
    icon: "📷",
    label: "Step 1",
    title: "Capture",
    desc: "Wearable camera records your surroundings in real time",
  },
  {
    icon: "📡",
    label: "Step 2",
    title: "Transmit",
    desc: "Video frames are sent to the VIHelp mobile app wirelessly",
  },
  {
    icon: "🧠",
    label: "Step 3",
    title: "Analyze",
    desc: "AI identifies objects, distances, text, and scene context",
  },
  {
    icon: "🎧",
    label: "Step 4",
    title: "Guide",
    desc: "Natural voice guidance reaches you instantly via earpiece",
  },
];

export default function HowItWorks() {
  const headerRef = useScrollAnimation();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".how-step");
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(32px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 120);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div
          className="fade-up"
          ref={headerRef}
          style={{ textAlign: "center", marginBottom: "8px" }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="section-title">
            Four steps to{" "}
            <span className="gradient-text">independence</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            From camera to voice in under two seconds.
          </p>
        </div>

        <div className="how-grid" ref={gridRef}>
          {steps.map((step, i) => (
            <div className="how-step" key={i}>
              <div className="step-circle">
                {step.icon}
                <span className="step-num">{i + 1}</span>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--accent-light)",
                  marginBottom: "6px",
                }}
              >
                {step.label}
              </p>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
