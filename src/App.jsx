import Home from "./pages/Home";
import { useState } from "react";
import Checkout from "./components/Checkout";

function App() {

  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  return (
    <>
      <Home
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default App;