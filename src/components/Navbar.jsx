import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🐠 Hamathi Aqua House
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Fish</a></li>
        <li><a href="#">Accessories</a></li>
        <li><a href="#">Plants</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <div className="nav-icons">
        <button className="theme-btn">🌙</button>
        <button className="cart-btn">🛒</button>
      </div>
    </nav>
  );
}

export default Navbar;