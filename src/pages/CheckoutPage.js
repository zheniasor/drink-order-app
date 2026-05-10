import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMapPin, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';

function CheckoutPage({ cart, getTotalPrice, clearCart }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupPoint: "center",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (!/^(\+375|80)\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введите корректный номер (+375XXXXXXXXX)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: getTotalPrice(),
      deliveryMethod: "pickup",
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
      pickupPoint: formData.pickupPoint,
      comment: formData.comment,
    };

    const savedOrders = localStorage.getItem("orders");
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();
    navigate("/order-confirmation", { state: { order } });
  };

  const pickupPoints = [
    { id: "center", name: "ул. Ленина, 25", hours: "09:00 - 21:00" },
    { id: "east", name: "пр. Независимости, 12", hours: "09:00 - 22:00" },
    { id: "west", name: "ул. Притыцкого, 156", hours: "10:00 - 20:00" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Оформление заказа</h1>

      <div style={styles.checkoutWrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <FiUser size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Контактные данные
            </h3>

            <div style={styles.field}>
              <label style={styles.label}>Имя *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Иван Иванов"
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Телефон *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                placeholder="+375 XX XXX XX XX"
              />
              {errors.phone && <span style={styles.error}>{errors.phone}</span>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email (необязательно)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="ivan@example.com"
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <FiMapPin size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Точка самовывоза
            </h3>

            <div style={styles.field}>
              <label style={styles.label}>Выберите удобную точку</label>
              <select
                name="pickupPoint"
                value={formData.pickupPoint}
                onChange={handleChange}
                style={styles.select}
              >
                {pickupPoints.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.name} ({point.hours})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <FiMessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Комментарий к заказу
            </h3>

            <div style={styles.field}>
              <label style={styles.label}>Пожелания к напиткам</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="Например: без льда, меньше сиропа, покрепче..."
                rows="3"
              />
            </div>
          </div>
        </form>

        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Ваш заказ</h3>

          <div style={styles.itemsList}>
            {cart.map((item) => (
              <div key={item.id} style={styles.summaryItem}>
                <div style={styles.summaryItemInfo}>
                  <span style={styles.summaryItemName}>{item.name}</span>
                  {item.customization && (
                    <span style={styles.summaryItemCustom}>✓ {item.customization}</span>
                  )}
                </div>
                <span style={styles.summaryItemPrice}>
                  {item.price} Br × {item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.divider}></div>

          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Итого:</span>
            <span style={styles.totalPrice}>{getTotalPrice()} Br</span>
          </div>

          <button onClick={handleSubmit} style={styles.submitButton}>
            Подтвердить заказ
          </button>

          <button onClick={() => navigate("/cart")} style={styles.backButton}>
            <FiArrowLeft size={16} style={{ marginRight: '8px' }} />
            Вернуться в корзину
          </button>
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
  checkoutWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "32px",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  section: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "2px solid #F5E6D3",
    display: "flex",
    alignItems: "center",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    color: "#555",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    fontSize: "15px",
    boxSizing: "border-box",
    transition: "border 0.2s ease",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "12px",
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    fontSize: "14px",
    backgroundColor: "white",
    boxSizing: "border-box",
  },
  error: {
    fontSize: "12px",
    color: "#E74C3C",
    marginTop: "6px",
    display: "block",
  },
  summary: {
    backgroundColor: "#F9F9F9",
    borderRadius: "20px",
    padding: "24px",
    height: "fit-content",
    position: "sticky",
    top: "90px",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#333",
    marginTop: 0,
    marginBottom: "20px",
  },
  itemsList: {
    maxHeight: "350px",
    overflowY: "auto",
    marginBottom: "16px",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px",
    fontSize: "14px",
    gap: "12px",
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemName: {
    fontWeight: 600,
    display: "block",
    color: "#333",
  },
  summaryItemCustom: {
    fontSize: "11px",
    color: "#6F4E37",
    display: "block",
    marginTop: "2px",
  },
  summaryItemPrice: {
    color: "#6F4E37",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E0E0E0",
    margin: "16px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: 600,
  },
  totalPrice: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#6F4E37",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "12px",
    transition: "all 0.2s ease",
  },
  backButton: {
    width: "100%",
    backgroundColor: "transparent",
    color: "#6F4E37",
    border: "1px solid #6F4E37",
    padding: "12px",
    borderRadius: "40px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

// Медиа-запрос для адаптивности
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @media (max-width: 768px) {
    .checkout-wrapper {
      grid-template-columns: 1fr !important;
    }
    .form-block {
      order: 0 !important;
      width: 100% !important;
    }
    .summary-block {
      order: 1 !important;
      width: 100% !important;
      position: static !important;
      margin-top: 20px;
    }
  }
`;
document.head.appendChild(styleSheet);

export default CheckoutPage;