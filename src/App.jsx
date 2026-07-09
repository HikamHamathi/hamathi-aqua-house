import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checkout from "./components/Checkout";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />
    </Routes>
  );
}

export default App;