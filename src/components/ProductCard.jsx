import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProductCard({ id, image, name, price }) {

  const { addToCart } = useCart();

  const { wishlist, toggleWishlist } = useWishlist();

  const isFavourite = wishlist.includes(id);

  const navigate = useNavigate();

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

      <Link to={`/product/${id}`}>
        <img src={image} alt={name} />
      </Link>

      <Link
        to={`/product/${id}`}
        className="product-link"
      >
        <h3>{name}</h3>
      </Link>

      <div className="rating">
        ⭐⭐⭐⭐⭐
      </div>

      <p className="price">
        Rs. {price}
      </p>

    {/* <button
      className="cart-btn"
      onClick={handleAdd}
    >
      <FaShoppingCart className="cart-icon" />
      <span>Add to Cart</span>
    </button> */}

    <div className="product-actions">

  <button
    className="cart-btn"
    onClick={handleAdd}
  >
    🛒 Add to Cart
  </button>

  <button
  className="buy-btn"
  onClick={() => {
    handleAdd();
    navigate("/checkout");
  }}
>
  ⚡ Buy Now
</button>

</div>

    </div>
  );
}

export default ProductCard;