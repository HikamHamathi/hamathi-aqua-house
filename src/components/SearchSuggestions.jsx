import { useSearch } from "../context/SearchContext";
import products from "../data/products";
import "./SearchSuggestions.css";

function SearchSuggestions() {

  const { search, setSearch } = useSearch();

  if (search.trim() === "") return null;

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
            🐠 {product.name}
          </div>
        ))
      )}

    </div>
  );
}

export default SearchSuggestions;