import ProductCard from "./ProductCard";
import "./ProductSection.css";
import products from "../data/products";
import { useSearch } from "../context/SearchContext";

function ProductSection({ search }) {
  const { search } = useSearch();
  const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(search.toLowerCase())
    );
  return (
    <section className="products" id="products">

      <h2>Featured Products</h2>

      <div className="product-grid">

        {filteredProducts.length === 0 ? (

        <h3
        style={{
        textAlign: "center",
        gridColumn: "1 / -1",
        color: "#0077b6",
        }}
        >
        No products found.
        </h3>

        ) : (

      filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
        />
        ))

      )}

      </div>

    </section>
  );
}

export default ProductSection;