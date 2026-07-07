import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {

  const { cart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [delivery, setDelivery] = useState("Delivery");
  const orderId =
  "HAH-" +
  Date.now().toString().slice(-6);
  const orderDate =
  new Date().toLocaleString();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const sendWhatsApp = () => {

  if (!name || !phone || !address) {
    alert("Please fill all required fields.");
    return;
  }

  let message = `🐠 *Hamathi Aqua House Order*%0A%0A`;

  message += `👤 Name: ${name}%0A`;
  message += `📞 Mobile: ${phone}%0A`;
  message += `🚚 Option : ${delivery}%0A`;
  message += `🏠 Address: ${address}%0A`;

  if (note.trim() !== "") {
    message += `📝 Note: ${note}%0A`;
  }

  message += `%0A🛒 *Order Items*%0A`;

  cart.forEach((item) => {
    message += `• ${item.name}%0A`;
    message += `   Qty: ${item.quantity}%0A`;
    message += `   Price: Rs. ${item.price}%0A`;
    message += `   Subtotal: Rs. ${item.price * item.quantity}%0A%0A`;
  });

  message += `💰 *Total: Rs. ${total}*`;

  window.open(
    `https://wa.me/94786767081?text=${message}`,
    "_blank"
  );
};

  return (
    <div className="checkout">
      <div className="checkout-header">

      <h2>Checkout</h2>

      {/* <img
        src="/logo.png"
        alt="Hamathi Aqua House"
        className="checkout-logo"
      /> */}

      <div>

        <h1>Hamathi Aqua House</h1>

        <p>Premium Aquarium Fish & Accessories

        </p>

      </div>

    </div>
      <div className="order-details">

          <p>

              <strong>Order ID :</strong>

              {orderId}

          </p>

          <p>

              <strong>Date :</strong>

              {orderDate}

          </p>

      </div>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Mobile Number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />
      <div className="delivery-options">

      <label>

      <input
      type="radio"
      value="Delivery"
      checked={delivery==="Delivery"}
      onChange={(e)=>setDelivery(e.target.value)}
      />

      Delivery

      </label>

      <label>

      <input
      type="radio"
      value="Pickup"
      checked={delivery==="Pickup"}
      onChange={(e)=>setDelivery(e.target.value)}
      />

      Pickup

      </label>

      </div>
      <textarea 
        placeholder="Delivery Address"
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
      />

      <textarea
        placeholder="Order Note (Optional)"
        value={note}
        onChange={(e)=>setNote(e.target.value)}
      />

      <h3>Your Order</h3>

      {cart.map(item=>(
        <div
          key={item.id}
          className="checkout-item"
        >
          <span>
            {item.name} × {item.quantity}
          </span>

          <span>
            Rs. {item.price * item.quantity}
          </span>
        </div>
      ))}

      <h2>Total : Rs. {total}</h2>

      <button
        className="whatsapp-btn"
        onClick={sendWhatsApp}
        >
        Place Order via WhatsApp
        </button>

    </div>
  );
}

export default Checkout;