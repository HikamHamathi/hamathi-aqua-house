import { useSearch } from "../context/SearchContext";
import products from "../data/products";
import "./SearchSuggestions.css";

function SearchSuggestions() {

  const { search, setSearch } = useSearch();

  if (search.trim() === "") return null;

  const results = products
  .filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .slice(0, 5);

  return (
    <div className="search-suggestions">

      {results.length === 0 ? (
        <div className="suggestion-item">
          No products found
        </div>
      ) : (
        results.map((product) => (
          <div
        key={product.id}
        className="suggestion-item"
        onClick={() => {
            setSearch(product.name);

            document
            .getElementById("products")
            ?.scrollIntoView({
                behavior: "smooth",
            });
        }}
        >

        <img
            src={product.image}
            alt={product.name}
            className="suggestion-image"
        />

        <div className="suggestion-info">
            <h4>{product.name}</h4>
            <p>Rs. {product.price}</p>
        

        </div>
           <span className="fish-icon">🐠</span> {product.name}
          </div>
        ))
      )}

    </div>
  );
}

export default SearchSuggestions;