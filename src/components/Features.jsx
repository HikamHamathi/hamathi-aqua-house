import "./Features.css";

function Features() {
  return (
    <section className="features">

      <h2>Why Choose Hamathi Aqua House?</h2>

      <div className="feature-grid">

        <div className="feature-card">
          <div className="icon">🐠</div>
          <h3>Healthy Fish</h3>
          <p>Premium quality aquarium fish with proper care.</p>
        </div>

        <div className="feature-card">
          <div className="icon">🚚</div>
          <h3>Islandwide Delivery</h3>
          <p>Fast & safe delivery across Sri Lanka.</p>
        </div>

        <div className="feature-card">
          <div className="icon">💬</div>
          <h3>Expert Support</h3>
          <p>Professional guidance for beginners & experts.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;