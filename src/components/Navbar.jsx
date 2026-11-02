import { useState } from "react";
import {
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaSearch,
  FaBars,
  FaTimes,
  FaHeart,
  FaHome,
  FaThLarge,
  FaUser,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useWishlist } from "../context/WishlistContext";

import SearchSuggestions from "./SearchSuggestions";
import WishlistDrawer from "./WishlistDrawer";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme();
  const { cart, openCart } = useCart();
  const { wishlist } = useWishlist();

  const {
    search,
    setSearch,
    setShowSuggestions,
  } = useSearch();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
    window.location.reload();
  };

  const handleSearch = () => {
    setShowSuggestions(false);

    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToSection = (section) => {
    closeMenu();

    if (section === "home") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="site-header">

        {/* TOP ROW */}
        <nav className="navbar">

          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">🐠</span>
            <span className="logo-text">
              Hamathi
              <small>AQUA HOUSE</small>
            </span>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* DESKTOP NAVIGATION */}
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#products">Fish & Products</a>
            </li>
            <li>
              <a href="#categories">Categories</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          {/* DESKTOP ACTIONS */}
          <div className="desktop-actions">

            <button
              className="header-icon"
              onClick={() => setWishlistOpen(true)}
              aria-label="Wishlist"
            >
              <FaHeart />
              {wishlist.length > 0 && (
                <span className="icon-count">{wishlist.length}</span>
              )}
            </button>

            <button
              className="header-icon"
              onClick={openCart}
              aria-label="Shopping cart"
            >
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="icon-count">{cart.length}</span>
              )}
            </button>

            <button
              className="header-icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

          </div>
        </nav>

        {/* SEARCH ROW - SINGLE SEARCH */}
        <div className="search-row">
          <div className="search-box">

            <FaSearch
              className="search-icon"
              onClick={handleSearch}
            />

            <input
              type="text"
              placeholder="Search fish, plants, tanks, accessories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <SearchSuggestions />

          </div>
        </div>

        {/* MOBILE SIDE MENU */}
        <div
          className={`mobile-menu-overlay ${menuOpen ? "show" : ""}`}
          onClick={closeMenu}
        />

        <ul className={`mobile-menu ${menuOpen ? "active" : ""}`}>

          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>

          <li>
            <button onClick={() => goToSection("products")}>
              Fish & Products
            </button>
          </li>

          <li>
            <button onClick={() => goToSection("categories")}>
              Categories
            </button>
          </li>

          <li>
            <button onClick={() => goToSection("contact")}>
              Contact
            </button>
          </li>

          <li className="mobile-menu-divider" />

          {user ? (
            <>
              <li className="menu-user">
                Welcome, {user.name}
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>Login</Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>Register</Link>
              </li>
            </>
          )}

          <li>
            <button onClick={toggleTheme}>
              {darkMode ? <FaSun /> : <FaMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>

        </ul>

      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="mobile-bottom-nav">

        <button onClick={() => goToSection("home")}>
          <FaHome />
          <span>Home</span>
        </button>

        <button onClick={() => goToSection("categories")}>
          <FaThLarge />
          <span>Categories</span>
        </button>

        <button onClick={() => setWishlistOpen(true)}>
          <span className="bottom-icon-wrap">
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="bottom-count">{wishlist.length}</span>
            )}
          </span>
          <span>Wishlist</span>
        </button>

        <button onClick={() => navigate(user ? "/" : "/login")}>
          <FaUser />
          <span>Account</span>
        </button>

        <button onClick={openCart}>
          <span className="bottom-icon-wrap">
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="bottom-count">{cart.length}</span>
            )}
          </span>
          <span>Cart</span>
        </button>

      </nav>

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />

    </>
  );
}

export default Navbar;