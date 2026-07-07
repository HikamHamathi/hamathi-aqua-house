import { useState } from "react";
import Home from "./pages/Home";
import Checkout from "./components/Checkout";

function App() {

  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      {showCheckout ? (
  <Checkout setShowCheckout={setShowCheckout} />
) : (
  <Home setShowCheckout={setShowCheckout} />
)}
    </>
  );
}

export default App;