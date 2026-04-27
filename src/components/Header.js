import React from "react";
import { Link } from "react-router-dom";

function Header({ cartCount }) {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        DrinkOrder
      </Link>

      <div style={styles.icons}>
        <Link to="/cart" style={styles.cartIcon}>
          🛒
          {cartCount > 0 && <span style={styles.cartCount}>{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#6F4E37",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  },
  icons: {
    display: "flex",
    gap: "20px",
  },
  cartIcon: {
    fontSize: "24px",
    textDecoration: "none",
    color: "white",
    position: "relative",
  },
  cartCount: {
    position: "absolute",
    top: "-8px",
    right: "-12px",
    backgroundColor: "#FF6B35",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

export default Header;
