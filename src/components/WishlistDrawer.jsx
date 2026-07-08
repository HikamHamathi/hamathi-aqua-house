import "./WishlistDrawer.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import products from "../data/products";

function WishlistDrawer({ open, onClose }) {

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const favouriteProducts = products.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className={open ? "wishlist-overlay active" : "wishlist-overlay"}>

      <div className={open ? "wishlist-drawer open" : "wishlist-drawer"}>

        <div className="wishlist-header">
          <h2>❤️ Wishlist</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {favouriteProducts.length === 0 ? (
          <p className="empty">
            No favourite products.
          </p>
        ) : (

          favouriteProducts.map((item) => (

            <div
              key={item.id}
              className="wishlist-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="wishlist-info">

                <h4>{item.name}</h4>

                <p>Rs. {item.price}</p>

                <button
                  className="wishlist-cart"
                  onClick={() => addToCart({
                    ...item,
                    quantity:1
                  })}
                >
                  Add to Cart
                </button>

              </div>

              <button
                className="remove"
                onClick={() =>
                  toggleWishlist(item.id)
                }
              >
                ❤️
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default WishlistDrawer;