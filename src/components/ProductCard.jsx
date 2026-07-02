import "./ProductCard.css";

function ProductCard({ image, name, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />

      <h3>{name}</h3>

      <p className="price">Rs. {price}</p>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;