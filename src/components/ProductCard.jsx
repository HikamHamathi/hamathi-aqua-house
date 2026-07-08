import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ id, image, name, price }) {

  const { addToCart } = useCart();

  const { wishlist, toggleWishlist } = useWishlist();

  const isFavourite = wishlist.includes(id);

const handleAdd = () => {
  addToCart({
    id,
    image,
    name,
    price
  });
};

  return (
    <div className="product-card">

      <span className="badge">NEW</span>

      <button
        className={`wishlist ${isFavourite ? "active" : ""}`}
        onClick={() => {
          console.log("Clicked", id);
          toggleWishlist(id);
        }}
      >
        <FaHeart />
      </button>

      {/* <button
        className={`wishlist ${isFavourite ? "active" : ""}`}
        onClick={() => toggleWishlist(id)}
      >
        <FaHeart />
      </button> */}

      <img src={image} alt={name} />

      <h3>{name}</h3>

      <div className="rating">
        ⭐⭐⭐⭐⭐
      </div>

      <p className="price">
        Rs. {price}
      </p>

    <button
      className="cart-btn"
      onClick={handleAdd}
      >
    🛒 Add to Cart
    </button>

    </div>
  );
}

export default ProductCard;