import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

function Navbar() {

    const { darkMode, toggleTheme } = useTheme();

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

                <input
                    type="text"
                    placeholder="Search..."
                />

                <button
                    onClick={toggleTheme}
                    className="theme-btn"
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <button className="cart">

                    🛒

                </button>

            </div>

        </nav>

    )

}

export default Navbar;