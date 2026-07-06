import { useState } from "react";
import Home from "./pages/Home";
import Checkout from "./components/Checkout";

function App() {

  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      {!showCheckout ? (

        <Home
          search={search}
          setSearch={setSearch}
          setShowCheckout={setShowCheckout}
        />

      ) : (

        <Checkout />

      )}
    </>
  );
}

export default App;