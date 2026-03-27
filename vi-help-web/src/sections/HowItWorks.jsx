export default function HowItWorks() {
  const steps = [
    {
      label: "Capture",
      icon: "📷",
      title: "Wearable Camera",
      desc: "Captures your surroundings instantly",
    },
    {
      label: "Transmit",
      icon: "📱",
      title: "Mobile App",
      desc: "Receives live video feed",
    },
    {
      label: "Analyze",
      icon: "🧠",
      title: "AI Processing",
      desc: "Understands your environment in real time",
    },
    {
      label: "Guide",
      icon: "🎧",
      title: "Audio Output",
      desc: "Guides user through voice",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>How VI Help Works</h2>

        <div className="flow-premium">
          {steps.map((step, i) => (
            <div className="flow-step" key={i}>
              <div className="glow-circle">{step.icon}</div>

              <p className="step-label">{step.label}</p>

              <h3>{step.title}</h3>
              <p>{step.desc}</p>

              {i !== steps.length - 1 && <div className="flow-line" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
