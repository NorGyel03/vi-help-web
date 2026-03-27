import logo from "../assets/logo.jpg";

export default function Navbar() {
  const handleScroll = (e, id) => {
    e.preventDefault();

    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src={logo} className="logo" />

        <div className="nav-links">
          <button onClick={() => scrollToSection("hero")}>Home</button>
          <button onClick={() => scrollToSection("prototype")}>
            Technology
          </button>
          <button onClick={() => scrollToSection("features")}>Features</button>
          <button onClick={() => scrollToSection("team")}>Team</button>
          <button onClick={() => scrollToSection("reach")}>Contact</button>
        </div>
      </div>
    </nav>
  );
}
