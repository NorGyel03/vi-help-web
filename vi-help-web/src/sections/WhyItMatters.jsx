import { useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const cards = [
  {
    icon: "💸",
    title: "Cost Barrier",
    desc: "Existing assistive solutions like guide dogs or advanced devices cost thousands of dollars — far out of reach for most families in Bhutan and similar regions.",
  },
  {
    icon: "🌍",
    title: "Limited Availability",
    desc: "Most assistive technologies are designed for high-income markets. Developing nations are largely overlooked, leaving millions without support.",
  },
  {
    icon: "🚶",
    title: "Everyday Struggles",
    desc: "Simple tasks — crossing a road, reading a menu, finding a bus stop — require outside help for visually impaired individuals without the right tools.",
  },
];

export default function WhyItMatters() {
  const topRef = useScrollAnimation();
  const cardsRef = useRef(null);

  useEffect(() => {
    const grid = cardsRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll(".why-card");
    items.forEach((c) => { c.style.opacity = "0"; c.style.transform = "translateY(28px)"; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((c, i) => {
            setTimeout(() => {
              c.style.transition = "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s";
              c.style.opacity = "1";
              c.style.transform = "translateY(0)";
            }, i * 120);
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
    <section id="why-it-matters" className="section">
      <div className="container">
        <div className="why-top fade-up" ref={topRef}>
          <div>
            <span className="section-label">Why It Matters</span>
            <h2 className="section-title">
              The problem is
              <br />
              <span className="gradient-text">bigger than you think</span>
            </h2>
          </div>
          <div>
            <div className="why-stat-big">253M</div>
            <p className="section-subtitle">
              people live with vision impairment worldwide. 80% are in
              low-to-middle-income countries, with little to no access to
              affordable assistive tech.
            </p>
            <p style={{ marginTop: "16px", fontSize: "14px", color: "var(--accent-light)", fontWeight: 600 }}>
              VIHelp aims to change that.
            </p>
          </div>
        </div>

        <div className="why-cards" ref={cardsRef}>
          {cards.map((c, i) => (
            <div className="why-card" key={i}>
              <div className="why-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
