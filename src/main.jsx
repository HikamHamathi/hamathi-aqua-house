import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import "./index.css";
import "./App.css";


import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

import { WishlistProvider } from "./context/WishlistContext";

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