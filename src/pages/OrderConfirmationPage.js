import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiClock, FiMapPin } from "react-icons/fi";

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order || null;

  const [orderStatus, setOrderStatus] = useState("preparing");
  const [timeRemaining, setTimeRemaining] = useState(15);

  useEffect(() => {
    if (!order) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setOrderStatus("ready");
          return 0;
        }
        return prev - 1;
      });
    }, 60000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [order]);

  if (!order) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ ...styles.successIcon, fontSize: "48px" }}>⚠️</div>
          <h1 style={{ ...styles.title, color: "#e74c3c" }}>Ошибка</h1>
          <p style={styles.subtitle}>
            Нет информации о заказе. Возможно, вы перешли на эту страницу
            напрямую.
          </p>
          <button onClick={() => navigate("/")} style={styles.homeButton}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const getStatusInfo = () => {
    switch (orderStatus) {
      case "preparing":
        return {
          text: "Готовится",
          description: "Ваш напиток готовят, осталось немного подождать",
          color: "#FF9800",
          step: 1,
        };
      case "ready":
        return {
          text: "Готов к выдаче",
          description: "Ваш заказ готов! Можете забирать",
          color: "#4CAF50",
          step: 2,
        };
      default:
        return {
          text: "Готовится",
          description: "Ваш напиток готовят",
          color: "#FF9800",
          step: 1,
        };
    }
  };

  const statusInfo = getStatusInfo();
  const displayOrderId = String(order.id).slice(-6);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.successIcon}>
          <FiCheckCircle size={64} color="#27ae60" />
        </div>

        <h1 style={styles.title}>Заказ успешно оформлен!</h1>
        <p style={styles.subtitle}>
          Спасибо за ваш заказ. Мы уже начали его готовить.
        </p>

        <div style={styles.orderNumber}>
          <span style={styles.orderNumberLabel}>Номер заказа:</span>
          <span style={styles.orderNumberValue}>#{displayOrderId}</span>
        </div>

        <div style={styles.statusSection}>
          <h3 style={styles.statusTitle}>Статус заказа</h3>

          <div style={styles.progressContainer}>
            <div style={styles.progressSteps}>
              <div
                style={{
                  ...styles.progressStep,
                  ...(statusInfo.step >= 1 ? styles.progressStepActive : {}),
                }}
              >
                <span
                  style={{
                    ...styles.progressStepIcon,
                    ...(statusInfo.step >= 1
                      ? styles.progressStepIconActive
                      : {}),
                  }}
                >
                  <FiClock size={20} />
                </span>
                <span style={styles.progressStepLabel}>Готовится</span>
              </div>
              <div style={styles.progressLine}>
                <div
                  style={{
                    ...styles.progressLineFill,
                    width: statusInfo.step >= 2 ? "100%" : "0%",
                  }}
                />
              </div>
              <div
                style={{
                  ...styles.progressStep,
                  ...(statusInfo.step >= 2 ? styles.progressStepActive : {}),
                }}
              >
                <span
                  style={{
                    ...styles.progressStepIcon,
                    ...(statusInfo.step >= 2
                      ? styles.progressStepIconActive
                      : {}),
                  }}
                >
                  <FiCheckCircle size={20} />
                </span>
                <span style={styles.progressStepLabel}>Готов</span>
              </div>
            </div>
          </div>

          <div
            style={{ ...styles.statusBadge, backgroundColor: statusInfo.color }}
          >
            <span style={styles.statusText}>{statusInfo.text}</span>
          </div>
          <p style={styles.statusDescription}>{statusInfo.description}</p>

          {orderStatus === "preparing" && timeRemaining > 0 && (
            <div style={styles.timeRemaining}>
              <FiClock size={18} style={{ marginRight: "10px" }} />
              <span>Примерно через {timeRemaining} минут будет готов</span>
            </div>
          )}

          {orderStatus === "ready" && (
            <div
              style={{ ...styles.timeRemaining, backgroundColor: "#E8F5E9" }}
            >
              <FiCheckCircle
                size={18}
                style={{ marginRight: "10px", color: "#27ae60" }}
              />
              <span>
                Заказ готов к выдаче! Ждём вас по адресу, который вы указали
              </span>
            </div>
          )}
        </div>

        <div style={styles.detailsSection}>
          <h3 style={styles.detailsTitle}>Детали заказа</h3>

          <div style={styles.detailsRow}>
            <span style={styles.detailsLabel}>Дата и время:</span>
            <span style={styles.detailsValue}>{order.date}</span>
          </div>

          <div style={styles.detailsRow}>
            <span style={styles.detailsLabel}>Способ получения:</span>
            <span style={styles.detailsValue}>
              <FiMapPin size={14} style={{ marginRight: "4px" }} /> Самовывоз
            </span>
          </div>

          <div style={styles.detailsRow}>
            <span style={styles.detailsLabel}>Точка выдачи:</span>
            <span style={styles.detailsValue}>
              {order.pickupPoint === "center" && "ул. Ленина, 25"}
              {order.pickupPoint === "east" && "пр. Независимости, 12"}
              {order.pickupPoint === "west" && "ул. Притыцкого, 156"}
            </span>
          </div>

          <div style={styles.detailsRow}>
            <span style={styles.detailsLabel}>Имя получателя:</span>
            <span style={styles.detailsValue}>{order.customer.name}</span>
          </div>

          <div style={styles.detailsRow}>
            <span style={styles.detailsLabel}>Телефон:</span>
            <span style={styles.detailsValue}>{order.customer.phone}</span>
          </div>
        </div>

        <div style={styles.itemsSection}>
          <h3 style={styles.itemsTitle}>Состав заказа</h3>

          {order.items.map((item, index) => (
            <div key={index} style={styles.itemRow}>
              <div style={styles.itemInfo}>
                <span style={styles.itemName}>{item.name}</span>
                {item.customization && (
                  <span style={styles.itemCustom}>✓ {item.customization}</span>
                )}
              </div>
              <div style={styles.itemQuantity}>{item.quantity} шт.</div>
              <div style={styles.itemPrice}>
                {(item.price * item.quantity).toFixed(2)} Br
              </div>
            </div>
          ))}

          <div style={styles.divider}></div>

          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Итого к оплате:</span>
            <span style={styles.totalPrice}>{order.total} Br</span>
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={() => navigate("/")} style={styles.homeButton}>
            Вернуться на главную
          </button>
          <button onClick={() => navigate("/")} style={styles.newOrderButton}>
            Сделать новый заказ
          </button>
        </div>

        <p style={styles.note}>
          * Статус заказа обновляется автоматически. Вы можете следить за
          готовностью на этой странице.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  successIcon: {
    textAlign: "center",
    marginBottom: "16px",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    color: "#6F4E37",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "24px",
  },
  orderNumber: {
    backgroundColor: "#f9f9f9",
    padding: "12px 16px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  orderNumberLabel: {
    color: "#666",
  },
  orderNumberValue: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#6F4E37",
  },
  statusSection: {
    marginBottom: "32px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
  },
  statusTitle: {
    marginBottom: "16px",
    color: "#333",
  },
  progressContainer: {
    marginBottom: "20px",
    overflowX: "auto",
  },
  progressSteps: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "250px",
  },
  progressStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    opacity: 0.4,
  },
  progressStepActive: {
    opacity: 1,
  },
  progressStepIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "#eee",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
  },
  progressStepIconActive: {
    backgroundColor: "#6F4E37",
    color: "white",
  },
  progressStepLabel: {
    fontSize: "11px",
    textAlign: "center",
  },
  progressLine: {
    width: "40px",
    height: "2px",
    backgroundColor: "#ddd",
    position: "relative",
  },
  progressLineFill: {
    height: "100%",
    backgroundColor: "#6F4E37",
    transition: "width 0.5s",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    borderRadius: "30px",
    marginBottom: "12px",
  },
  statusText: {
    fontWeight: "bold",
    color: "white",
  },
  statusDescription: {
    color: "#666",
    fontSize: "14px",
  },
  timeRemaining: {
    marginTop: "16px",
    padding: "12px",
    backgroundColor: "#FFF3E0",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  detailsSection: {
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
  },
  detailsTitle: {
    marginBottom: "16px",
    color: "#333",
  },
  detailsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "14px",
  },
  detailsLabel: {
    color: "#666",
  },
  detailsValue: {
    fontWeight: "500",
    textAlign: "right",
  },
  itemsSection: {
    marginBottom: "32px",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
  },
  itemsTitle: {
    marginBottom: "16px",
    color: "#333",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
    gap: "10px",
  },
  itemInfo: {
    flex: 2,
  },
  itemName: {
    fontWeight: "500",
    display: "block",
  },
  itemCustom: {
    fontSize: "11px",
    color: "#6F4E37",
    display: "block",
    marginTop: "2px",
  },
  itemQuantity: {
    flex: 0.5,
    textAlign: "center",
    color: "#666",
  },
  itemPrice: {
    flex: 0.7,
    textAlign: "right",
    fontWeight: "500",
    color: "#6F4E37",
  },
  divider: {
    height: "1px",
    backgroundColor: "#ddd",
    margin: "15px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#6F4E37",
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  homeButton: {
    flex: 1,
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  newOrderButton: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#6F4E37",
    border: "1px solid #6F4E37",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  note: {
    textAlign: "center",
    fontSize: "12px",
    color: "#999",
    marginTop: "20px",
  },
};

export default OrderConfirmationPage;
