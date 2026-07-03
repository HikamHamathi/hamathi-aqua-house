import "./Testimonials.css";

function Testimonials() {
  return (
    <section className="testimonials">

      <h2>What Our Customers Say</h2>

      <div className="testimonial-grid">

        <div className="testimonial-card">
          <p>
            "Excellent quality fish. Healthy and active. Highly recommended!"
          </p>
          <h4>⭐⭐⭐⭐⭐</h4>
          <span>- Kasun Perera</span>
        </div>

        <div className="testimonial-card">
          <p>
            "Fast delivery and very friendly customer service."
          </p>
          <h4>⭐⭐⭐⭐⭐</h4>
          <span>- Nadeesha Silva</span>
        </div>

        <div className="testimonial-card">
          <p>
            "Best aquarium shop in Sri Lanka. Will definitely buy again."
          </p>
          <h4>⭐⭐⭐⭐⭐</h4>
          <span>- Dilshan Fernando</span>
        </div>

      </div>

    </section>
  );
}

export default Testimonials;