import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>

<ThemeProvider>

<CartProvider>

<App/>

</CartProvider>

</ThemeProvider>

</React.StrictMode>

);