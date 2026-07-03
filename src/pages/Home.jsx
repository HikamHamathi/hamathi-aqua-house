import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
        <ProductSection />
        <Features />
        <Testimonials />
        <Contact />
        <footer />
    </>
  );
}

export default Home;
