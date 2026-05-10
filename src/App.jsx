import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import NavBar from "./components/NavBar";
import LogoShowcase from "./components/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import ExperienceSection from "./sections/ExperienceSection";
import TechStack from "./sections/TechStack";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <ExperienceSection />
      <TechStack />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default App;
