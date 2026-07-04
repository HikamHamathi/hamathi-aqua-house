import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";
import { useState } from "react";
import {
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
// import { FaShoppingCart, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import SearchSuggestions from "./SearchSuggestions";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const { darkMode, toggleTheme } = useTheme();
    const { cart, openCart } = useCart();
    const { search, setSearch } = useSearch();
    const handleSearch = () => {
    document
    .getElementById("products")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
     });
    };

    return (

        <nav className="navbar">

            <div className="logo">

                🐠 Hamathi Aqua House

            </div>
            <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <ul className={menuOpen ? "nav-links active" : "nav-links"}>

                <li onClick={() => setMenuOpen(false)}>Home</li>
                <li onClick={() => setMenuOpen(false)}>Fish</li>
                <li onClick={() => setMenuOpen(false)}>Accessories</li>
                <li onClick={() => setMenuOpen(false)}>Plants</li>
                <li onClick={() => setMenuOpen(false)}>Contact</li>

            </ul>

            <div className="right">

                <div className="search-box">

                <FaSearch
                className="search-icon"
                onClick={handleSearch}
                />

                <input
                type="text"
                placeholder="Search fish, plants, accessories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                handleSearch();
                }
                }}
                />
                <SearchSuggestions />
            </div>

                <button
                onClick={toggleTheme}
                className="theme-btn"
                >
            {darkMode ? <FaSun /> : 
            <FaMoon />}
            </button>

            <button className="cart" onClick={openCart}>
            <FaShoppingCart />
            <span className="cart-count">
            {cart.length}
            </span>
            </button>

            </div>

        </nav>

    )

}

export default Navbar;