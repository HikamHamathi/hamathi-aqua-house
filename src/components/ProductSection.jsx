import ProductCard from "./ProductCard";
import "./ProductSection.css";
import products from "../data/products";

function ProductSection({ search }) {
  const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(search.toLowerCase())
    );
  return (
    <section className="products">

      <h2>Featured Products</h2>

      <div className="product-grid">

        {filteredProducts.map((product) => (

          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />

        ))}

      </div>

    </section>
  );
}

export default ProductSection;