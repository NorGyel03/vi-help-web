import { useScrollAnimation } from "../hooks/useScrollAnimation";

const milestones = [
  {
    status: "done",
    tag: "Completed",
    date: "Q4 2024",
    title: "Working Prototype Built",
    desc: "First end-to-end prototype connecting wearable camera to mobile app with basic object detection.",
  },
  {
    status: "done",
    tag: "Completed",
    date: "Q1 2025",
    title: "Real-time AI Detection Validated",
    desc: "Achieved sub-2-second response time for object detection and scene description in controlled tests.",
  },
  {
    status: "done",
    tag: "Completed",
    date: "Q2 2025",
    title: "Voice Feedback System Implemented",
    desc: "Natural-language audio guidance integrated with Bluetooth earpiece, tested with visually impaired users.",
  },
  {
    status: "done",
    tag: "Completed",
    date: "Q3 2025",
    title: "Initial Funding Secured",
    desc: "Received seed funding from BITC and Thimphu TechPark to scale development and expand the team.",
  },
  {
    status: "active",
    tag: "In Progress",
    date: "Q4 2025 – Q1 2026",
    title: "Field Testing & User Research",
    desc: "Running pilot tests with visually impaired communities in Bhutan to gather feedback and improve accuracy.",
  },
  {
    status: "pending",
    tag: "Upcoming",
    date: "2026",
    title: "Public Beta Launch",
    desc: "Open the platform to early adopters across Bhutan with a focus on affordability and accessibility.",
  },
];

export default function Progress() {
  const headerRef = useScrollAnimation();
  const roadmapRef = useScrollAnimation(0.05);

  return (
    <section id="progress" className="section">
      <div className="container">
        <div className="fade-up" ref={headerRef}>
          <span className="section-label">Roadmap</span>
          <h2 className="section-title">
            Our journey{" "}
            <span className="gradient-text">so far</span>
          </h2>
          <p className="section-subtitle">
            From a college project to a funded startup — here's how VIHelp
            has evolved.
          </p>
        </div>

        <div className="roadmap fade-up" ref={roadmapRef}>
          {milestones.map((m, i) => (
            <div className="roadmap-item" key={i}>
              {i % 2 === 0 ? (
                <>
                  <div className="roadmap-content">
                    <span className={`roadmap-tag ${m.status}`}>{m.tag}</span>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>{m.date}</p>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                  <div className="roadmap-dot-col">
                    <div className={`roadmap-dot ${m.status}`} />
                  </div>
                  <div className="roadmap-empty" />
                </>
              ) : (
                <>
                  <div className="roadmap-empty" />
                  <div className="roadmap-dot-col">
                    <div className={`roadmap-dot ${m.status}`} />
                  </div>
                  <div className="roadmap-content">
                    <span className={`roadmap-tag ${m.status}`}>{m.tag}</span>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>{m.date}</p>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
