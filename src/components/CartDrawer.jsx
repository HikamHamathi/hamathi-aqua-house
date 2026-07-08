import "./CartDrawer.css";
import { useCart } from "../context/CartContext";

function CartDrawer({ setShowCheckout }) {

  const {
  cart,
  isCartOpen,
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
  );

  return (
    <div className="cart-drawer">

      <button className="close-btn" onClick={closeCart}>
        ✕
      </button>

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        <>
          {cart.map((item, index) => (

            <div className="cart-item" key={index}>

              <img src={item.image} alt={item.name} />

              <div className="cart-info">

              <h4>{item.name}</h4>

              <p>Rs. {item.price}</p>

              <div className="quantity-controls">

              <button
                className="qty-btn"
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>

              <span className="qty-value">
                {item.quantity}
              </span>

              <button
                className="qty-btn"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>

            </div>

              <p>
                Subtotal: <strong>Rs. {item.price * item.quantity}</strong>
              </p>

              </div>
              <button
                className="delete-btn"
                onClick={() => removeFromCart(item.id)}
                >
                🗑️
              </button>

            </div>

          ))}

          <h3>Total: Rs. {total}</h3>

          <button
          className="checkout-btn"
          onClick={() => {
            closeCart();
            setShowCheckout(true);
          }}
          >
          Checkout
          </button>

        </>

      )}

    </div>
  );
}

export default CartDrawer;