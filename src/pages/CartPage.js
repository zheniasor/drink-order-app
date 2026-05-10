import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

function CartPage({ cart, removeFromCart, updateQuantity, getTotalPrice }) {
  if (cart.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <div style={styles.emptyCartIcon}>🛒</div>
        <h2 style={styles.emptyCartTitle}>Ваша корзина пуста</h2>
        <p style={styles.emptyCartText}>Добавьте напитки, чтобы оформить заказ</p>
        <Link to="/" style={styles.emptyCartButton}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Корзина</h1>

      <div style={styles.cartContent}>
        <div style={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />

              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemVolume}>{item.volume} л</p>
                {item.customization && (
                  <p style={styles.itemCustom}>✓ {item.customization}</p>
                )}
                <p style={styles.itemPrice}>
                  {item.price} Br × {item.quantity}
                </p>
              </div>

              <div style={styles.itemControls}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.quantityBtn}
                >
                  <FiMinus size={14} />
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityBtn}
                >
                  <FiPlus size={14} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeBtn}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>

              <div style={styles.itemTotal}>
                <strong>{(item.price * item.quantity).toFixed(2)} Br</strong>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Итого заказа</h3>
          <div style={styles.summaryRow}>
            <span>Товаров:</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Сумма:</span>
            <span style={styles.summaryPrice}>{getTotalPrice()} Br</span>
          </div>
          <Link to="/checkout" style={styles.checkoutBtn}>
            Оформить заказ
          </Link>
          <Link to="/" style={styles.continueBtn}>
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#6F4E37",
    marginBottom: "32px",
  },
  emptyCart: {
    textAlign: "center",
    padding: "60px 20px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  emptyCartIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.5,
  },
  emptyCartTitle: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "8px",
  },
  emptyCartText: {
    color: "#666",
    marginBottom: "24px",
  },
  emptyCartButton: {
    display: "inline-block",
    backgroundColor: "#6F4E37",
    color: "white",
    textDecoration: "none",
    padding: "12px 32px",
    borderRadius: "30px",
    fontWeight: 500,
  },
  cartContent: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "32px",
  },
  cartItems: {
    border: "1px solid #EEE",
    borderRadius: "16px",
    overflow: "hidden",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #EEE",
    gap: "16px",
  },
  itemImage: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: "16px",
    fontWeight: 600,
    margin: 0,
  },
  itemVolume: {
    fontSize: "13px",
    color: "#999",
    margin: "4px 0",
  },
  itemCustom: {
    fontSize: "11px",
    color: "#6F4E37",
    margin: "2px 0",
  },
  itemPrice: {
    fontSize: "14px",
    color: "#666",
    margin: "4px 0",
  },
  itemControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  quantityBtn: {
    width: "32px",
    height: "32px",
    border: "1px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    minWidth: "30px",
    textAlign: "center",
    fontWeight: 500,
  },
  removeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTotal: {
    minWidth: "80px",
    textAlign: "right",
    fontWeight: 600,
    color: "#6F4E37",
  },
  summary: {
    backgroundColor: "#F9F9F9",
    padding: "24px",
    borderRadius: "16px",
    height: "fit-content",
    position: "sticky",
    top: "90px",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: 600,
    marginTop: 0,
    marginBottom: "20px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "15px",
  },
  summaryPrice: {
    fontWeight: 700,
    color: "#6F4E37",
    fontSize: "18px",
  },
  checkoutBtn: {
    display: "block",
    backgroundColor: "#6F4E37",
    color: "white",
    textAlign: "center",
    padding: "14px",
    textDecoration: "none",
    borderRadius: "40px",
    marginTop: "20px",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  continueBtn: {
    display: "block",
    backgroundColor: "transparent",
    color: "#6F4E37",
    textAlign: "center",
    padding: "12px",
    textDecoration: "none",
    borderRadius: "40px",
    marginTop: "12px",
    border: "1px solid #6F4E37",
    transition: "all 0.2s ease",
  },
};

export default CartPage;