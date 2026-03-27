import "./styles.css";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Prototype from "./sections/Technology";
import About from "./sections/About";
import Features from "./sections/Features";
import WhyItMatters from "./sections/WhyItMatters";
import Progress from "./sections/Progress";
import Team from "./sections/Team";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import HowItWorks from "./sections/HowItWorks";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Prototype />
      <HowItWorks />
      <Features />
      <WhyItMatters />
      <Progress />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
