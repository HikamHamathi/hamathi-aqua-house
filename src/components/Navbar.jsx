import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";
import { FaShoppingCart, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

function Navbar() {

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

            <ul>

                <li>Home</li>

                <li>Fish</li>

                <li>Accessories</li>

                <li>Plants</li>

                <li>Contact</li>

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
                alert("Enter pressed");
                handleSearch();
                }
                }}
                // onKeyDown={(e) => {
                // if (e.key === "Enter") {
                // handleSearch();
                // }
                // }}
                />
                
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