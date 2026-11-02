import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({
  id,
  image,
  name,
  price,
  oldPrice,
  stock,
  rating,
  reviews,
  badge,
}) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isFavourite = wishlist.includes(id);
  const outOfStock = stock !== undefined && stock <= 0;

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const handleAdd = () => {
    if (outOfStock) return;

    addToCart({
      id,
      image,
      name,
      price,
    });
  };

  const handleBuyNow = () => {
    if (outOfStock) return;

    handleAdd();
    navigate("/checkout");
  };

  return (
    <article className="premium-product-card">

      <div className="premium-product-image">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} loading="lazy" />
        </Link>

        {outOfStock ? (
          <span className="premium-product-badge sold-out">
            Out of Stock
          </span>
        ) : badge ? (
          <span className="premium-product-badge">
            {badge}
          </span>
        ) : discount > 0 ? (
          <span className="premium-product-badge">
            {discount}% OFF
          </span>
        ) : null}

        <button
          type="button"
          className={`premium-favourite ${isFavourite ? "active" : ""}`}
          onClick={() => toggleWishlist(id)}
          aria-label={
            isFavourite
              ? `Remove ${name} from wishlist`
              : `Add ${name} to wishlist`
          }
        >
          <FaHeart />
        </button>
      </div>

      <div className="premium-product-info">

        <Link to={`/product/${id}`} className="premium-product-name">
          {name}
        </Link>

        {rating !== undefined && (
          <div className="premium-product-rating">
            <FaStar />
            <strong>{rating}</strong>
            {reviews !== undefined && (
              <span>({reviews})</span>
            )}
          </div>
        )}

        <div className="premium-product-prices">
          <strong>Rs. {Number(price).toLocaleString("en-LK")}</strong>

          {oldPrice > price && (
            <del>
              Rs. {Number(oldPrice).toLocaleString("en-LK")}
            </del>
          )}
        </div>

        <div className="premium-product-actions">
          <button
            type="button"
            className="premium-cart-btn"
            onClick={handleAdd}
            disabled={outOfStock}
            aria-label={`Add ${name} to cart`}
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            className="premium-buy-btn"
            onClick={handleBuyNow}
            disabled={outOfStock}
          >
            Buy Now
          </button>
        </div>

      </div>
    </article>
  );
}

export default ProductCard;