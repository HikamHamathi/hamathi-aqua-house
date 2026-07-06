import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import CartDrawer from "../components/CartDrawer";
import { useState } from "react";
import Checkout from "../components/Checkout";

function Home({ search, setSearch }) {
  const [showCheckout, setShowCheckout] = useState(false);
  return (
    <>
      <Navbar 
      search={search}
      setSearch={setSearch}
      />
      <Hero />
        <ProductSection
        search={search} 
        />
        <Features />
        <Testimonials />
        <Contact />
        <CartDrawer setShowCheckout={setShowCheckout} />
        {showCheckout && (
        <Checkout />
      )}
        <footer />
    </>
  );
}

export default Home;
