import ProductCard from "./ProductCard";
import "./ProductSection.css";

function ProductSection() {
  return (
    <section className="products">

      <h2>Featured Fish</h2>

      <div className="product-grid">

        <ProductCard
          image="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600"
          name="Gold Fish"
          price="2500"
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600"
          name="Betta Fish"
          price="1800"
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=600"
          name="Angel Fish"
          price="3200"
        />

      </div>

    </section>
  );
}

export default ProductSection;