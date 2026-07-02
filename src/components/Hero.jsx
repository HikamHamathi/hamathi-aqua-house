import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="overlay"></div>

      <div className="hero-content">

        <h1>Hamathi Aqua House</h1>

        <p>
          Premium Aquarium Fish & Accessories in Sri Lanka
        </p>

        <div className="hero-buttons">

          <button className="shop-btn">
            Shop Now
          </button>

          <button className="explore-btn">
            Explore Fish
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;