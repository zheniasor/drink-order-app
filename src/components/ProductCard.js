import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ drink, onAddToCart }) {
  const handleQuickAdd = (e) => {
    e.preventDefault();
    onAddToCart({ ...drink, quantity: 1 });
  };

  return (
    <div style={styles.card}>
      <Link to={`/product/${drink.id}`} style={styles.link}>
        <img src={drink.image} alt={drink.name} style={styles.image} />
        <h3 style={styles.name}>{drink.name}</h3>
        <p style={styles.description}>{drink.description}</p>
        <p style={styles.volume}>{drink.volume} л</p>
      </Link>
      <div style={styles.footer}>
        <span style={styles.price}>{drink.price} Br</span>
        <button onClick={handleQuickAdd} style={styles.button}>
          В корзину
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #E0E0E0",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "12px",
  },
  name: {
    fontSize: "18px",
    fontWeight: 600,
    margin: "12px 0 8px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    margin: "8px 0",
    lineHeight: 1.4,
  },
  volume: {
    fontSize: "12px",
    color: "#999",
    margin: "4px 0",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #EEE",
  },
  price: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#6F4E37",
  },
  button: {
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "8px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.2s ease",
  },
};

export default ProductCard;