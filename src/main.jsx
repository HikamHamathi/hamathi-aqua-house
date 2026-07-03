import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>

<ThemeProvider>

<SearchProvider>

<CartProvider>

<App/>

</CartProvider>

</SearchProvider>

</ThemeProvider>

</React.StrictMode>

);