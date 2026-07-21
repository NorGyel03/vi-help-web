import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const phases = [
  {
    phase: 1,
    status: "done",
    year: "2024",
    icon: "💡",
    title: "University Idea & Problem Discovery",
    tag: "The Beginning",
    summary: "Identified a real problem while studying AI & Robotics at VIT Chennai.",
    highlights: [
      "Visually impaired individuals struggle to navigate independently",
      "Existing assistive devices are expensive and unavailable in Bhutan",
      "Chose to build something that genuinely improves lives",
      "This became VIHelp",
    ],
  },
  {
    phase: 2,
    status: "done",
    year: "2024",
    icon: "🔍",
    title: "Research & Problem Validation",
    tag: "Human-Centered",
    summary: "Validated the idea before writing a single line of code.",
    highlights: [
      "Interviewed visually impaired individuals",
      "Partnered with Disabled People's Organization of Bhutan (DPOB)",
      "Identified daily navigation challenges",
      "Learned affordability matters more than sophisticated hardware",
    ],
    quote: "Shifted VIHelp from an AI project to a human-centered solution.",
  },
  {
    phase: 3,
    status: "done",
    year: "2024",
    icon: "⚙️",
    title: "MVP Development",
    tag: "Engineering",
    summary: "Built the first wearable prototype from scratch.",
    highlights: [
      "ESP32-S3 Camera mounted on a hat",
      "YOLO Object Detection + MiDaS Depth Estimation",
      "Python AI Server with real-time audio feedback",
      "Core: detect objects, estimate distance, speak obstacles",
    ],
  },
  {
    phase: 4,
    status: "done",
    year: "2025",
    icon: "🧪",
    title: "Pilot Testing with Real Users",
    tag: "Validation",
    summary: "Tested VIHelp with visually impaired users — the biggest milestone.",
    highlights: [
      "Pilot testing with real visually impaired users",
      "Collected feedback and fixed bugs",
      "Improved usability based on actual needs",
      "Transformed prototype into a usable MVP",
    ],
  },
  {
    phase: 5,
    status: "done",
    year: "2025",
    icon: "🏆",
    title: "Bhutan Startup Launchpad Acceptance",
    tag: "Breakthrough",
    summary: "VIHelp was accepted into Bhutan Startup Launchpad 2026.",
    highlights: [
      "Problem validated by independent experts",
      "Solution recognized as commercially viable",
      "Team capability confirmed",
      "Officially a funded Bhutanese startup",
    ],
  },
  {
    phase: 6,
    status: "done",
    year: "2025",
    icon: "🌱",
    title: "Tranche 1 — First Funding",
    tag: "Funded",
    summary: "Built the first functional prototype with initial grant funding.",
    highlights: [
      "Initial hardware assembly",
      "AI integration complete",
      "User validation conducted",
      "Business model drafted",
      "First pitch developed",
    ],
  },
  {
    phase: 7,
    status: "active",
    year: "2026",
    icon: "🚀",
    title: "Tranche 2 — Current Stage",
    tag: "Nu. 150,000",
    summary: "No longer proving the technology. Proving the business.",
    highlights: [
      "Stable MVP with better enclosure & hardware",
      "Improved detection accuracy & battery life",
      "Refined business model, GTM strategy & pricing",
      "Strengthening partnerships: DPOB, Ministry of Health, Bhutan Foundation",
      "VIHelp should look like a startup preparing to sell",
    ],
  },
  {
    phase: 8,
    status: "pending",
    year: "2026–2027",
    icon: "📋",
    title: "Tranche 3 — Becoming a Business",
    tag: "Upcoming",
    summary: "Where VIHelp becomes an actual registered business.",
    highlights: [
      "Business registration & license",
      "Brand identity & website",
      "Early customers & institutional partnerships",
      "First revenue — proving people will pay",
    ],
  },
  {
    phase: 9,
    status: "pending",
    year: "2027",
    icon: "🇧🇹",
    title: "Commercial Launch in Bhutan",
    tag: "Launch",
    summary: "Official launch — revenue from device sales, not just grants.",
    highlights: [
      "Customers: individuals, hospitals, schools, NGOs, government",
      "Revenue: device sales, institutional procurement, support packages",
      "Move from hand-built devices to small-scale production",
    ],
  },
  {
    phase: 10,
    status: "pending",
    year: "2027",
    icon: "🌏",
    title: "National Scale — Reaching All of Bhutan",
    tag: "Scale",
    summary: "Every visually impaired Bhutanese who needs VIHelp should have it.",
    highlights: [
      "Thousands of users across Bhutan",
      "Full national distribution network",
      "Institutional procurement model established",
    ],
  },
  {
    phase: 11,
    status: "pending",
    year: "2028",
    icon: "🌐",
    title: "Regional Expansion",
    tag: "Expansion",
    summary: "Target countries with similar challenges and large underserved populations.",
    highlights: [
      "Nepal, India, Bangladesh, Sri Lanka",
      "High cost of assistive tech — same problem, larger market",
      "Adapt hardware & pricing for each market",
    ],
  },
  {
    phase: 12,
    status: "pending",
    year: "2028+",
    icon: "🔭",
    title: "Global Assistive AI Company",
    tag: "Vision",
    summary: "VIHelp becomes an Assistive AI Platform, not just one product.",
    highlights: [
      "Smart Glasses with real-time AI vision",
      "Indoor Navigation for hospitals, schools & malls",
      "Public Transport Assistance & OCR Reader",
      "AI Companion: voice assistant, emergency SOS, face recognition",
      "Smart Mobility Ecosystem connecting devices, apps & caregivers",
    ],
  },
];

const STATUS_STYLE = {
  done:    { bg: "rgba(99,102,241,0.12)", color: "#818cf8", dot: "#6366f1", label: "Completed" },
  active:  { bg: "rgba(139,92,246,0.15)", color: "#c4b5fd", dot: "#8b5cf6", label: "Current"   },
  pending: { bg: "rgba(71,85,105,0.15)",  color: "#64748b", dot: "#334155", label: "Upcoming"  },
};

export default function Progress() {
  const headerRef = useScrollAnimation();
  const timelineRef = useRef(null);
  const [expanded, setExpanded] = useState(7); // Tranche 2 open by default

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".tl-card") || [];
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-20px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((el, i) => {
            setTimeout(() => {
              el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
              el.style.opacity = "1";
              el.style.transform = "translateX(0)";
            }, i * 60);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.03 }
    );
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="progress" className="section">
      <div className="container">
        {/* Header */}
        <div className="fade-up" ref={headerRef}>
          <span className="section-label">Roadmap</span>
          <h2 className="section-title">
            The VIHelp Journey{" "}
            <span className="gradient-text">2025 – 2028</span>
          </h2>
          <p className="section-subtitle">
            From a university idea in Chennai to a global assistive AI company.
            Here's every step of the journey.
          </p>

          {/* Legend */}
          <div style={{ display: "flex", gap: "20px", marginTop: "24px", flexWrap: "wrap" }}>
            {Object.entries(STATUS_STYLE).map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: v.dot, display: "inline-block", boxShadow: k === "active" ? `0 0 8px ${v.dot}` : "none" }} />
                {v.label}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="tl-root" ref={timelineRef}>
          {phases.map((p) => {
            const s = STATUS_STYLE[p.status];
            const isOpen = expanded === p.phase;

            return (
              <div className="tl-card" key={p.phase}>
                {/* Dot + line */}
                <div className="tl-dot-col">
                  <div
                    className="tl-dot"
                    style={{
                      background: p.status === "pending" ? "var(--bg-secondary)" : s.dot,
                      border: `2px solid ${s.dot}`,
                      boxShadow: p.status === "active" ? `0 0 16px ${s.dot}` : "none",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className={`tl-content${p.status === "active" ? " tl-active" : ""}`}
                  onClick={() => setExpanded(isOpen ? null : p.phase)}
                >
                  {/* Header row */}
                  <div className="tl-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, flexWrap: "wrap" }}>
                      <span className="tl-icon">{p.icon}</span>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase" }}>
                            Phase {p.phase}
                          </span>
                          <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "999px", background: s.bg, color: s.color }}>
                            {p.tag}
                          </span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.year}</span>
                        </div>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>{p.title}</h3>
                      </div>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "18px", flexShrink: 0, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      ›
                    </span>
                  </div>

                  {/* Summary always visible */}
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "10px 0 0", lineHeight: 1.6 }}>
                    {p.summary}
                  </p>

                  {/* Expanded details */}
                  {isOpen && (
                    <div className="tl-expanded">
                      <ul className="tl-highlights">
                        {p.highlights.map((h, i) => (
                          <li key={i}>
                            <span className="tl-check" style={{ color: s.color }}>
                              {p.status === "pending" ? "○" : "✓"}
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      {p.quote && (
                        <blockquote className="tl-quote" style={{ borderColor: s.dot }}>
                          {p.quote}
                        </blockquote>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision & Mission */}
        <div className="vision-block fade-up">
          <div className="vision-card">
            <div className="vision-label">Vision</div>
            <p>Empower every visually impaired individual to navigate the world independently through affordable AI-powered assistive technology.</p>
          </div>
          <div className="vision-card">
            <div className="vision-label">Mission</div>
            <p>Build accessible, affordable, and intelligent assistive solutions that improve independence, safety, and quality of life for visually impaired communities — starting in Bhutan and expanding globally.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
