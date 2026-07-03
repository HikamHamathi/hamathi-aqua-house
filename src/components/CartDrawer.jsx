import "./CartDrawer.css";
import { useCart } from "../context/CartContext";

function CartDrawer() {

  const { isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer">

      <button
        className="close-btn"
        onClick={closeCart}
      >
        ✖
      </button>

      <h2>Shopping Cart</h2>

      <p>Your cart items will appear here.</p>

      <button className="checkout-btn">
        Checkout
      </button>

    </div>
  );
}

export default CartDrawer;