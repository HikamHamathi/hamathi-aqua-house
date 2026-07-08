import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import "./index.css";
import "./App.css";
import { WishlistProvider } from "./context/WishlistContext";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>

<ThemeProvider>

<WishlistProvider>

<SearchProvider>

<CartProvider>

<App/>

</CartProvider>

</SearchProvider>

</WishlistProvider>

</ThemeProvider>

</React.StrictMode>

);