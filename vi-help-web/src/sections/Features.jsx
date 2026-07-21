import { useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const features = [
  {
    icon: "🎯",
    title: "Object Detection",
    desc: "Identifies hundreds of everyday objects — doors, cars, people, furniture — and tells you exactly what's around you.",
  },
  {
    icon: "📏",
    title: "Distance Awareness",
    desc: "Estimates how close or far objects are, warning you of obstacles before you reach them.",
  },
  {
    icon: "🎙️",
    title: "Voice Feedback",
    desc: "Clear, natural-language audio delivered through your earpiece. No screens, no buttons.",
  },
  {
    icon: "📖",
    title: "Text Reading (OCR)",
    desc: "Reads signs, menus, labels, and documents aloud so you never miss important written information.",
  },
  {
    icon: "🗺️",
    title: "Navigation Assistance",
    desc: "Helps you understand your environment — entrances, pathways, and spatial layout described in seconds.",
  },
  {
    icon: "🔋",
    title: "Lightweight & Wearable",
    desc: "Compact hardware designed for all-day comfort. Clips onto glasses or worn as a lanyard.",
  },
];

export default function Features() {
  const headerRef = useScrollAnimation();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".feature-card");
    cards.forEach((c) => { c.style.opacity = "0"; c.style.transform = "translateY(28px)"; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((c, i) => {
            setTimeout(() => {
              c.style.transition = "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s, transform 0.3s";
              c.style.opacity = "1";
              c.style.transform = "translateY(0)";
            }, i * 90);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section">
      <div className="container">
        <div className="fade-up" ref={headerRef}>
          <span className="section-label">Features</span>
          <h2 className="section-title">
            Everything you need to{" "}
            <span className="gradient-text">navigate the world</span>
          </h2>
          <p className="section-subtitle">
            VIHelp packs powerful assistive capabilities into a simple,
            voice-first experience.
          </p>
        </div>

        <div className="features-grid" ref={gridRef}>
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
