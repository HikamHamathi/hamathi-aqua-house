import "../styles/Hero.css";

function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <span className="hero-eyebrow">
          PREMIUM AQUARIUM COLLECTION
        </span>

        <h1>
          Bring Your
          <span> Aquarium </span>
          to Life
        </h1>

        <p>
          Discover beautiful ornamental fish, lush aquatic plants
          and quality aquarium accessories.
        </p>

        <div className="hero-buttons">

          <button
            className="shop-btn"
            onClick={() => scrollToSection("products")}
          >
            Shop Collection
            <span> →</span>
          </button>

          <button
            className="explore-btn"
            onClick={() => scrollToSection("categories")}
          >
            Explore Categories
          </button>

        </div>

        <div className="hero-features">
          <span>✦ Quality Aquarium Products</span>
          <span>✦ Islandwide Delivery</span>
        </div>

      </div>

      <div className="hero-bottom-label">
        HAMATHI AQUA HOUSE
      </div>

    </section>
  );
}

export default Hero;