import { useEffect, useRef } from "react";
import norbu from "../assets/norbu.png";
import tshewang from "../assets/tshewang.jpg";
import sangay from "../assets/sangay.png";
import dechen from "../assets/dechen.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const members = [
  {
    name: "Norbu Gyeltshen",
    role: "Founder & CPO",
    specialty: "Product & Embedded Systems",
    bio: "Drives product vision and hardware design. Leads embedded systems integration for the wearable device.",
    image: norbu,
  },
  {
    name: "Tshewang Yeshi",
    role: "Co-founder & CTO",
    specialty: "AI & Backend Systems",
    bio: "Architects the AI pipeline and backend infrastructure. Expert in computer vision and real-time processing.",
    image: tshewang,
  },
  {
    name: "Sangay Wangmo",
    role: "Business Analyst",
    specialty: "Market Research & Outreach",
    bio: "Leads market research, user discovery, and partnership development across Bhutan and the region.",
    image: sangay,
  },
  {
    name: "Dechen Pelmo",
    role: "Operations Manager",
    specialty: "Strategy & Operations",
    bio: "Manages day-to-day operations, coordinates with partners, and ensures the team hits its milestones.",
    image: dechen,
  },
];

export default function Team() {
  const headerRef = useScrollAnimation();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll(".team-card");
    cards.forEach((c) => { c.style.opacity = "0"; c.style.transform = "translateY(28px)"; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((c, i) => {
            setTimeout(() => {
              c.style.transition = "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s";
              c.style.opacity = "1";
              c.style.transform = "translateY(0)";
            }, i * 100);
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
    <section id="team" className="section">
      <div className="container">
        <div className="fade-up" ref={headerRef}>
          <span className="section-label">The Team</span>
          <h2 className="section-title">
            People behind{" "}
            <span className="gradient-text">VIHelp</span>
          </h2>
          <p className="section-subtitle">
            A passionate team from Bhutan building technology that matters.
          </p>
        </div>

        <div className="team-grid" ref={gridRef}>
          {members.map((m, i) => (
            <div className="team-card" key={i}>
              <img src={m.image} alt={m.name} className="team-card-img" />
              <div className="team-card-body">
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                <p className="bio">{m.bio}</p>
                <p style={{ marginTop: "10px", fontSize: "11px", color: "var(--accent-light)", fontWeight: 600 }}>
                  {m.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
