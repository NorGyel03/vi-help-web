import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function About() {
  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          {/* Left: content */}
          <div className="about-content fade-left" ref={leftRef}>
            <span className="section-label">About VIHelp</span>
            <h2 className="section-title">
              Giving vision back
              <br />
              <span className="gradient-text">through AI &amp; voice</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "28px" }}>
              VIHelp is an AI-powered assistive system that helps visually
              impaired individuals navigate daily life independently. A wearable
              camera captures the environment, our mobile app processes it with
              computer vision, and instant voice guidance is delivered through
              an earpiece — in real time.
            </p>
            <p className="section-subtitle" style={{ marginBottom: "32px", fontSize: "14px" }}>
              Built in Bhutan, designed for the world. We believe affordability
              should never be a barrier to independence.
            </p>

            <div className="about-pills">
              <span className="about-pill">🎧 Voice-First</span>
              <span className="about-pill">📷 Wearable Camera</span>
              <span className="about-pill">🧠 Real-time AI</span>
              <span className="about-pill">🌍 Affordable</span>
              <span className="about-pill">🇧🇹 Made in Bhutan</span>
            </div>
          </div>

          {/* Right: stat cards */}
          <div className="about-visual fade-right" ref={rightRef}>
            <div className="about-stat-card">
              <div className="num">253M+</div>
              <div className="label">People with vision impairment worldwide</div>
            </div>
            <div className="about-stat-card">
              <div className="num">39M</div>
              <div className="label">People who are fully blind</div>
            </div>
            <div className="about-stat-card">
              <div className="num">80%</div>
              <div className="label">Live in low-income countries</div>
            </div>
            <div className="about-stat-card">
              <div className="num">&lt; 2s</div>
              <div className="label">VIHelp AI response time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
