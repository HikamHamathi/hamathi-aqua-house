import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checkout from "./components/Checkout";
import ProductDetails from "./pages/ProductDetails";

// new pages
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/product/:id" element={<ProductDetails />} />

    </Routes>
  );
}

export default App;