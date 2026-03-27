import prototype from "../assets/prototype.jpeg";

export default function Prototype() {
  return (
    <section id="prototype" className="section">
      <div className="container prototype-grid">
        <div>
          <h2>Our Technology</h2>

          <ul className="prototype-list">
            <li>Wearable camera captures real-time video</li>
            <li>Mobile app processes the feed using AI</li>
            <li>Instant voice feedback through earpiece</li>
          </ul>
        </div>

        <div className="product">
          <img src={prototype} alt="Prototype" />
        </div>
      </div>
    </section>
  );
}
