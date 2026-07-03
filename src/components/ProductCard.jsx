import "./ProductCard.css";
import { useCart } from "../context/CartContext";

function ProductCard({ id, image, name, price }) {

  const { addToCart } = useCart();

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

      <button className="wishlist">
        ❤
      </button>

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