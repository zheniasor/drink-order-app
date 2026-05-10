import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from 'react-icons/fi';

function Header({ cartCount }) {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        Drinkly
      </Link>

      <div style={styles.icons}>
        <Link to="/profile" style={styles.iconLink}>
          <FiUser size={22} color="white" />
        </Link>
        <Link to="/cart" style={styles.iconLink}>
          <FiShoppingCart size={22} color="white" />
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
    padding: "16px 32px",
    backgroundColor: "#6F4E37",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  logo: {
    fontSize: "28px",
    fontWeight: 700,
    textDecoration: "none",
    color: "white",
    letterSpacing: "-0.5px",
  },
  icons: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  iconLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
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
    fontSize: "11px",
    fontWeight: "bold",
    minWidth: "18px",
    textAlign: "center",
  },
};

export default Header;