import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiEdit2, FiTrash2, FiMapPin } from "react-icons/fi";
import { FaHistory, FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";

function ProfilePage({ user, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders"); // orders, details, favorites
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        email: userData.email || "",
      });
    } else if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavoriteDrinks(JSON.parse(savedFavorites));
    }
  }, [user]);

  const handleSaveProfile = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    if (setUser) {
      setUser(formData);
    }
    setIsEditing(false);
    alert("Данные сохранены!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    if (setUser) {
      setUser(null);
    }
    navigate("/");
  };

  const repeatOrder = (order) => {
    localStorage.setItem("cart", JSON.stringify(order.items));
    alert("Заказ добавлен в корзину!");
    navigate("/cart");
  };

  const removeFavorite = (drinkId) => {
    const newFavorites = favoriteDrinks.filter((d) => d.id !== drinkId);
    setFavoriteDrinks(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn && !user) {
    return (
      <div style={styles.container}>
        <div style={styles.loginCard}>
          <h1 style={styles.title}>Вход в личный кабинет</h1>
          <p style={styles.subtitle}>
            Войдите, чтобы увидеть историю заказов и сохранить рецепты
          </p>

          <div style={styles.loginForm}>
            <div style={styles.field}>
              <label style={styles.label}>Имя или телефон</label>
              <input
                type="text"
                placeholder="Иван Иванов"
                id="loginName"
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Пароль</label>
              <input
                type="password"
                placeholder="••••••"
                id="loginPassword"
                style={styles.input}
              />
            </div>
            <button
              onClick={() => {
                const name = document.getElementById("loginName").value;
                if (name.trim()) {
                  localStorage.setItem("isLoggedIn", "true");
                  localStorage.setItem(
                    "user",
                    JSON.stringify({ name: name.trim() }),
                  );
                  window.location.reload();
                } else {
                  alert("Введите имя");
                }
              }}
              style={styles.loginButton}
            >
              Войти
            </button>
            <p style={styles.registerHint}>
              Нет аккаунта? Просто введите имя — он создастся автоматически
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <h1 style={styles.title}>Личный кабинет</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FiLogOut size={18} style={{ marginRight: "8px" }} /> Выйти
        </button>
      </div>

      {/* Вкладки */}
      <div style={styles.tabs}>
        <button onClick={() => setActiveTab("orders")} style={styles.tab}>
          <FaHistory style={{ marginRight: "8px" }} /> История заказов
        </button>
        <button onClick={() => setActiveTab("details")} style={styles.tab}>
          <FaUser style={{ marginRight: "8px" }} /> Мои данные
        </button>
        <button onClick={() => setActiveTab("favorites")} style={styles.tab}>
          <FaHeart style={{ marginRight: "8px" }} /> Избранное
        </button>
      </div>

      {}
      {activeTab === "orders" && (
        <div style={styles.tabContent}>
          {orders.length === 0 ? (
            <div style={styles.emptyState}>
              <p>У вас пока нет заказов</p>
              <button onClick={() => navigate("/")} style={styles.emptyButton}>
                Сделать первый заказ
              </button>
            </div>
          ) : (
            <div style={styles.ordersList}>
              {orders
                .slice()
                .reverse()
                .map((order) => (
                  <div key={order.id} style={styles.orderCard}>
                    <div style={styles.orderHeader}>
                      <div>
                        <span style={styles.orderNumber}>
                          Заказ #{String(order.id).slice(-6)}
                        </span>
                        <span style={styles.orderDate}>
                          {formatDate(order.date)}
                        </span>
                      </div>
                      <span style={styles.orderTotal}>{order.total} Br</span>
                    </div>

                    <div style={styles.orderItems}>
                      {order.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} style={styles.orderItem}>
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{item.price * item.quantity} Br</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div style={styles.orderMore}>
                          + ещё {order.items.length - 3} позиции
                        </div>
                      )}
                    </div>

                    <div style={styles.orderFooter}>
                      <span style={styles.orderPickup}>
                        <FiMapPin style={{ marginRight: "4px" }} /> Самовывоз
                      </span>
                      <button
                        onClick={() => repeatOrder(order)}
                        style={styles.repeatButton}
                      >
                        <FaShoppingBag
                          size={14}
                          style={{ marginRight: "6px" }}
                        />{" "}
                        Повторить
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {}
      {activeTab === "details" && (
        <div style={styles.tabContent}>
          <div style={styles.profileCard}>
            {isEditing ? (
              <>
                <div style={styles.field}>
                  <label style={styles.label}>Имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    style={styles.input}
                    placeholder="+375 XX XXX XX XX"
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={styles.input}
                    placeholder="ivan@example.com"
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button onClick={handleSaveProfile} style={styles.saveButton}>
                    Сохранить
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={styles.cancelButton}
                  >
                    Отмена
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Имя:</span>
                  <span style={styles.infoValue}>
                    {formData.name || "Не указано"}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Телефон:</span>
                  <span style={styles.infoValue}>
                    {formData.phone || "Не указан"}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Email:</span>
                  <span style={styles.infoValue}>
                    {formData.email || "Не указан"}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  style={styles.editButton}
                >
                  <FiEdit2 size={16} style={{ marginRight: "8px" }} />{" "}
                  Редактировать данные
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {}
      {activeTab === "favorites" && (
        <div style={styles.tabContent}>
          {favoriteDrinks.length === 0 ? (
            <div style={styles.emptyState}>
              <p>У вас пока нет избранных напитков</p>
              <button onClick={() => navigate("/")} style={styles.emptyButton}>
                Добавить напитки
              </button>
            </div>
          ) : (
            <div style={styles.favoritesList}>
              {favoriteDrinks.map((drink) => (
                <div key={drink.id} style={styles.favoriteCard}>
                  <img
                    src={drink.image}
                    alt={drink.name}
                    style={styles.favoriteImage}
                  />
                  <div style={styles.favoriteInfo}>
                    <h4 style={styles.favoriteName}>{drink.name}</h4>
                    <p style={styles.favoritePrice}>{drink.price} Br</p>
                  </div>
                  <button
                    onClick={() => removeFavorite(drink.id)}
                    style={styles.removeFavoriteBtn}
                  >
                    <FiTrash2 size={18} color="#999" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  profileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    color: "#6F4E37",
    margin: 0,
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    borderBottom: "1px solid #ddd",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#666",
  },
  tabActive: {
    color: "#6F4E37",
    borderBottom: "2px solid #6F4E37",
  },
  tabContent: {
    minHeight: "400px",
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  loginForm: {
    maxWidth: "400px",
    margin: "0 auto",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#6F4E37",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  registerHint: {
    fontSize: "12px",
    color: "#999",
    marginTop: "15px",
  },
  field: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  orderCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "15px",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  orderNumber: {
    fontWeight: "bold",
    color: "#6F4E37",
  },
  orderDate: {
    fontSize: "12px",
    color: "#999",
    marginLeft: "10px",
  },
  orderTotal: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  orderItems: {
    marginBottom: "10px",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "5px",
  },
  orderMore: {
    fontSize: "12px",
    color: "#999",
    marginTop: "5px",
  },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "10px",
    borderTop: "1px solid #ddd",
  },
  orderPickup: {
    fontSize: "14px",
    color: "#666",
  },
  repeatButton: {
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
  profileCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "20px",
  },
  infoRow: {
    display: "flex",
    marginBottom: "15px",
  },
  infoLabel: {
    width: "100px",
    fontWeight: "bold",
    color: "#555",
  },
  infoValue: {
    flex: 1,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  saveButton: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#999",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#999",
  },
  emptyButton: {
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  },
  favoritesList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px",
  },
  favoriteCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "12px",
    gap: "15px",
  },
  favoriteImage: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    margin: 0,
    fontSize: "16px",
  },
  favoritePrice: {
    margin: "5px 0 0",
    color: "#6F4E37",
    fontWeight: "bold",
  },
  removeFavoriteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default ProfilePage;
