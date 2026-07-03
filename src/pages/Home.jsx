import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import CartDrawer from "../components/CartDrawer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
        <ProductSection />
        <Features />
        <Testimonials />
        <Contact />
        <CartDrawer />
        <footer />
    </>
  );
}

export default Home;
