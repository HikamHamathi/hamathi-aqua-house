import "./ProductCard.css";

function ProductCard({ image, name, price }) {
  return (
    <div className="product-card">

      <span className="badge">NEW</span>

      <button className="wishlist">❤</button>

      <img src={image} alt={name} />

      <h3>{name}</h3>

      <div className="rating">
        ⭐⭐⭐⭐⭐
      </div>

      <p className="price">Rs. {price}</p>

      <button className="cart-btn">
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;