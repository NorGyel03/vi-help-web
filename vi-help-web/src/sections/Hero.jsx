export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="hero" className="hero-dark">
      <div className="container">
        <h1>
          VI Help -{" "}
          <span>A Real-time AI guidance for the visually impaired</span>
        </h1>

        <p>
          See the world through AI — delivered instantly through voice. <br />
        </p>

        <br />

        <div className="container">
          <h2 className="big-text">
            Independence shouldn’t depend on affordability.
          </h2>

          <p className="section-subtext">
            VI Help is building accessible AI for those who need it most.
          </p>
        </div>

        <button
          onClick={() => scrollToSection("reach")}
          className="btn-primary"
        >
          Get Early Access
        </button>
      </div>
    </section>
  );
}
