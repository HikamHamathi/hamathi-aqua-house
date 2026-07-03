import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";
import { FaShoppingCart, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar() {

    const { darkMode, toggleTheme } = useTheme();
    const { cart } = useCart();

    return (

        <nav className="navbar">

            <div className="logo">

                🐠 Hamathi Aqua House

            </div>

            <ul>

                <li>Home</li>

                <li>Fish</li>

                <li>Accessories</li>

                <li>Plants</li>

                <li>Contact</li>

            </ul>

            <div className="right">

                <div className="search-box">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search..."
            />
            </div>

                <button
                onClick={toggleTheme}
                className="theme-btn"
                >
            {darkMode ? <FaSun /> : 
            <FaMoon />}
            </button>

            <button className="cart">
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