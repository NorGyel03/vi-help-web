import "./styles.css";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Technology from "./sections/Technology";
import HowItWorks from "./sections/HowItWorks";
import Features from "./sections/Features";
import WhyItMatters from "./sections/WhyItMatters";
import Progress from "./sections/Progress";
import Team from "./sections/Team";
import Newsletter from "./sections/Newsletter";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Technology />
      <HowItWorks />
      <Features />
      <WhyItMatters />
      <Progress />
      <Team />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
