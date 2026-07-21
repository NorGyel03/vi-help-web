import prototype from "../assets/prototype.jpeg";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const tech = [
  {
    icon: "📷",
    title: "Wearable Camera",
    desc: "Lightweight camera clips onto glasses or a lanyard, capturing your environment in real time.",
  },
  {
    icon: "📱",
    title: "Mobile AI App",
    desc: "Our Android app receives the live feed and runs computer vision models on-device and in the cloud.",
  },
  {
    icon: "🧠",
    title: "AI Scene Understanding",
    desc: "Powered by large vision models that detect objects, read text, identify people, and understand context.",
  },
  {
    icon: "🎧",
    title: "Instant Voice Feedback",
    desc: "Clear, natural-language audio descriptions delivered through a Bluetooth earpiece within seconds.",
  },
];

export default function Technology() {
  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  return (
    <section id="prototype" className="section">
      <div className="container">
        <div className="tech-grid">
          {/* Image */}
          <div className="tech-image fade-left" ref={leftRef}>
            <div className="tech-image-glow" />
            <img src={prototype} alt="VIHelp prototype device" />
          </div>

          {/* Content */}
          <div className="fade-right" ref={rightRef}>
            <span className="section-label">Technology</span>
            <h2 className="section-title">
              How our system
              <br />
              <span className="gradient-text">sees for you</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "0" }}>
              Four components working in perfect harmony to turn visual
              information into instant guidance.
            </p>

            <ul className="tech-list">
              {tech.map((item, i) => (
                <li className="tech-list-item" key={i}>
                  <div className="tech-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
