import "./CartDrawer.css";
import { useCart } from "../context/CartContext";

function CartDrawer() {

  const { cart, isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

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

              <div>

                <h4>{item.name}</h4>

                <p>Rs. {item.price}</p>

              </div>

            </div>

          ))}

          <h3>Total: Rs. {total}</h3>

          <button className="checkout-btn">
            Checkout
          </button>

        </>

      )}

    </div>
  );
}

export default CartDrawer;