import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { drinks } from "../data/menuData";
import { FaFire, FaSnowflake, FaIceCream } from 'react-icons/fa';
import { GiCoffeeBeans } from 'react-icons/gi';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const drink = drinks.find((d) => d.id === parseInt(id));

  const [size, setSize] = useState("medium");
  const [milkType, setMilkType] = useState("regular");
  const [syrups, setSyrups] = useState([]);
  const [temperature, setTemperature] = useState("hot");
  const [extraShot, setExtraShot] = useState(false);
  const [whippedCream, setWhippedCream] = useState(false);
  const [comment, setComment] = useState("");

  const sizePrices = {
    small: {
      price: drink.price - 1.5,
      label: "Маленький (0.2 л)",
      volume: "0.2",
    },
    medium: { price: drink.price, label: "Средний (0.3 л)", volume: "0.3" },
    large: {
      price: drink.price + 2.0,
      label: "Большой (0.4 л)",
      volume: "0.4",
    },
  };

  const milkPrices = {
    regular: { name: "Обычное молоко", price: 0 },
    soy: { name: "Соевое молоко", price: 2.0 },
    almond: { name: "Миндальное молоко", price: 2.5 },
    oat: { name: "Овсяное молоко", price: 2.2 },
  };

  const syrupOptions = [
    { id: "vanilla", name: "Ванильный", price: 1.2 },
    { id: "caramel", name: "Карамельный", price: 1.2 },
    { id: "hazelnut", name: "Лесной орех", price: 1.2 },
    { id: "chocolate", name: "Шоколадный", price: 1.5 },
    { id: "coconut", name: "Кокосовый", price: 1.5 },
  ];

  const calculateTotalPrice = () => {
    let total = sizePrices[size].price;
    if (milkType !== "regular") total += milkPrices[milkType].price;
    syrups.forEach((syrup) => {
      const option = syrupOptions.find((s) => s.id === syrup);
      if (option) total += option.price;
    });
    if (extraShot) total += 2.0;
    if (whippedCream) total += 1.5;
    return total.toFixed(2);
  };

  const toggleSyrup = (syrupId) => {
    setSyrups((prev) =>
      prev.includes(syrupId) ? prev.filter((id) => id !== syrupId) : [...prev, syrupId]
    );
  };

  const handleAddToCart = () => {
    const customizationText = [];
    if (size !== "medium") customizationText.push(sizePrices[size].label);
    if (milkType !== "regular") customizationText.push(milkPrices[milkType].name);
    if (syrups.length > 0) {
      const syrupNames = syrups.map((s) => syrupOptions.find((opt) => opt.id === s)?.name);
      customizationText.push(`сиропы: ${syrupNames.join(", ")}`);
    }
    if (temperature === "cold") customizationText.push("со льдом");
    if (extraShot) customizationText.push("доп. шот эспрессо");
    if (whippedCream) customizationText.push("взбитые сливки");
    if (comment) customizationText.push(`комментарий: ${comment}`);

    const customizedDrink = {
      ...drink,
      id: `${drink.id}-${Date.now()}`,
      price: parseFloat(calculateTotalPrice()),
      volume: sizePrices[size].volume,
      customization: customizationText.join(", "),
      quantity: 1,
    };

    addToCart(customizedDrink);
    navigate("/cart");
  };

  if (!drink) {
    return (
      <div style={styles.notFound}>
        <h2>Напиток не найден</h2>
        <button onClick={() => navigate("/")} style={styles.notFoundButton}>
          Вернуться в каталог
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Назад
      </button>

      <div style={styles.productContent}>
        <div style={styles.imageSection}>
          <img src={drink.image} alt={drink.name} style={styles.image} />
        </div>

        <div style={styles.infoSection}>
          <h1 style={styles.name}>{drink.name}</h1>
          <p style={styles.description}>{drink.description}</p>
          <p style={styles.composition}>
            <strong>Состав:</strong> {drink.composition}
          </p>
          <p style={styles.calories}>⚡ {drink.calories} ккал</p>

          <div style={styles.customizationBlock}>
            <h3 style={styles.customizationTitle}>Настройте напиток</h3>

            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Размер порции:</label>
              <div style={styles.sizeButtons}>
                {Object.entries(sizePrices).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSize(key)}
                    style={{
                      ...styles.sizeButton,
                      ...(size === key ? styles.sizeButtonActive : {}),
                    }}
                  >
                    {value.label}
                    <span style={styles.sizePrice}>{value.price} Br</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Тип молока:</label>
              <div style={styles.milkButtons}>
                {Object.entries(milkPrices).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setMilkType(key)}
                    style={{
                      ...styles.milkButton,
                      ...(milkType === key ? styles.milkButtonActive : {}),
                    }}
                  >
                    {value.name}
                    {value.price > 0 && <span style={styles.extraPrice}>+{value.price} Br</span>}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Сиропы:</label>
              <div style={styles.syrupButtons}>
                {syrupOptions.map((syrup) => (
                  <button
                    key={syrup.id}
                    onClick={() => toggleSyrup(syrup.id)}
                    style={{
                      ...styles.syrupButton,
                      ...(syrups.includes(syrup.id) ? styles.syrupButtonActive : {}),
                    }}
                  >
                    {syrup.name}
                    <span style={styles.extraPrice}>+{syrup.price} Br</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Температура:</label>
              <div style={styles.tempButtons}>
                <button
                  onClick={() => setTemperature("hot")}
                  style={{
                    ...styles.tempButton,
                    ...(temperature === "hot" ? styles.tempButtonActive : {}),
                  }}
                >
                  <FaFire style={{ marginRight: '8px' }} /> Горячий
                </button>
                <button
                  onClick={() => setTemperature("cold")}
                  style={{
                    ...styles.tempButton,
                    ...(temperature === "cold" ? styles.tempButtonActive : {}),
                  }}
                >
                  <FaSnowflake style={{ marginRight: '8px' }} /> Со льдом
                </button>
              </div>
            </div>

            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Добавки:</label>
              <div style={styles.extrasButtons}>
                <button
                  onClick={() => setExtraShot(!extraShot)}
                  style={{
                    ...styles.extraButton,
                    ...(extraShot ? styles.extraButtonActive : {}),
                  }}
                >
                  <GiCoffeeBeans style={{ marginRight: '8px' }} /> Доп. шот эспрессо +2.00 Br
                </button>
                <button
                  onClick={() => setWhippedCream(!whippedCream)}
                  style={{
                    ...styles.extraButton,
                    ...(whippedCream ? styles.extraButtonActive : {}),
                  }}
                >
                  <FaIceCream style={{ marginRight: '8px' }} /> Взбитые сливки +1.50 Br
                </button>
              </div>
            </div>

            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Комментарий:</label>
              <textarea
                placeholder="Например: меньше сиропа, покрепче, без льда..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={styles.commentInput}
                rows="3"
              />
            </div>
          </div>

          <div style={styles.footer}>
            <div style={styles.totalPrice}>
              Итого: <span style={styles.totalPriceValue}>{calculateTotalPrice()} Br</span>
            </div>
            <button onClick={handleAddToCart} style={styles.addToCartButton}>
              Добавить в корзину
            </button>
          </div>
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
  backButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#6F4E37",
    cursor: "pointer",
    padding: "10px 0",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
  },
  notFound: {
    textAlign: "center",
    padding: "60px 20px",
  },
  notFoundButton: {
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "30px",
    cursor: "pointer",
    marginTop: "20px",
  },
  productContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
  },
  imageSection: {
    backgroundColor: "#F5F5F5",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "16px",
    objectFit: "cover",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  name: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#6F4E37",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    lineHeight: 1.5,
  },
  composition: {
    fontSize: "14px",
    color: "#888",
  },
  calories: {
    fontSize: "14px",
    color: "#888",
  },
  customizationBlock: {
    backgroundColor: "#F9F9F9",
    borderRadius: "20px",
    padding: "24px",
    marginTop: "8px",
  },
  customizationTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#333",
    marginTop: 0,
    marginBottom: "20px",
  },
  optionGroup: {
    marginBottom: "24px",
  },
  optionLabel: {
    display: "block",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#555",
    fontSize: "14px",
  },
  sizeButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  sizeButton: {
    padding: "12px 20px",
    border: "1px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "40px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.2s ease",
  },
  sizeButtonActive: {
    borderColor: "#6F4E37",
    backgroundColor: "#F5E6D3",
    borderWidth: "2px",
  },
  sizePrice: {
    fontSize: "12px",
    color: "#6F4E37",
    fontWeight: 600,
  },
  milkButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  milkButton: {
    padding: "10px 18px",
    border: "1px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "40px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  milkButtonActive: {
    borderColor: "#6F4E37",
    backgroundColor: "#F5E6D3",
  },
  syrupButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  syrupButton: {
    padding: "10px 18px",
    border: "1px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "40px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  syrupButtonActive: {
    borderColor: "#6F4E37",
    backgroundColor: "#F5E6D3",
  },
  tempButtons: {
    display: "flex",
    gap: "12px",
  },
  tempButton: {
    padding: "10px 24px",
    border: "1px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
  tempButtonActive: {
    borderColor: "#6F4E37",
    backgroundColor: "#F5E6D3",
  },
  extrasButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  extraButton: {
    padding: "10px 18px",
    border: "1px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
  extraButtonActive: {
    borderColor: "#6F4E37",
    backgroundColor: "#F5E6D3",
  },
  extraPrice: {
    fontSize: "11px",
    color: "#6F4E37",
    marginLeft: "6px",
  },
  commentInput: {
    width: "100%",
    padding: "12px",
    border: "1px solid #E0E0E0",
    borderRadius: "12px",
    fontFamily: "inherit",
    fontSize: "14px",
    resize: "vertical",
    boxSizing: "border-box",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid #EEE",
    marginTop: "8px",
  },
  totalPrice: {
    fontSize: "18px",
    color: "#666",
  },
  totalPriceValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#6F4E37",
  },
  addToCartButton: {
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    padding: "14px 36px",
    borderRadius: "40px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default ProductPage;