import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import "./App.css";

import { ThemeProvider } from "./context/ThemeContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <WishlistProvider>
          <SearchProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </SearchProvider>
        </WishlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);