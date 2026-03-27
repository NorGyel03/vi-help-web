import norbu from "../assets/norbu.png";
import tshewang from "../assets/tshewang.jpg";
import sangay from "../assets/sangay.png";
import dechen from "../assets/dechen.png";

export default function Team() {
  const members = [
    {
      name: "Norbu Gyeltshen",
      role: "Founder & Chief Product Officer",
      info: "Product & Embedded Systems",
      image: norbu,
    },
    {
      name: "Tshewang Yeshi",
      role: "Co-founder & Chief Technical Officer",
      info: "AI & Backend Systems",
      image: tshewang,
    },
    {
      name: "Sangay Wangmo",
      role: "Business Analyst/ Operations Lead",
      info: "Strategy & Operations",
      image: sangay,
    },
    {
      name: "Dechen Pelmo",
      role: "Business Analyst/ Marketing Lead",
      info: "Market Research & Outreach",
      image: dechen,
    },
  ];

  return (
    <section id="team" className="section">
      <div className="container">
        <h2>Our Team</h2>

        <div className="team">
          {members.map((m, i) => (
            <div key={i} className="member">
              <img src={m.image} className="avatar" />

              <h3>{m.name}</h3>
              <p>{m.role}</p>

              <div className="member-overlay">
                <p>{m.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
