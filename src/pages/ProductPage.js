import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { drinks } from '../data/menuData';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Находим выбранный напиток
  const drink = drinks.find(d => d.id === parseInt(id));
  
  // Состояния для кастомизации
  const [size, setSize] = useState('medium');
  const [milkType, setMilkType] = useState('regular');
  const [syrups, setSyrups] = useState([]);
  const [temperature, setTemperature] = useState('hot');
  const [extraShot, setExtraShot] = useState(false);
  const [whippedCream, setWhippedCream] = useState(false);
  const [comment, setComment] = useState('');

  // Цены за разные размеры
  const sizePrices = {
    small: { price: drink.price - 40, label: 'Маленький (0.2 л)', volume: '0.2' },
    medium: { price: drink.price, label: 'Средний (0.3 л)', volume: '0.3' },
    large: { price: drink.price + 50, label: 'Большой (0.4 л)', volume: '0.4' }
  };

  // Дополнительные опции и их цена
  const milkPrices = {
    regular: { name: 'Обычное молоко', price: 0 },
    soy: { name: 'Соевое молоко', price: 50 },
    almond: { name: 'Миндальное молоко', price: 70 },
    oat: { name: 'Овсяное молоко', price: 60 }
  };

  const syrupOptions = [
    { id: 'vanilla', name: 'Ванильный', price: 30 },
    { id: 'caramel', name: 'Карамельный', price: 30 },
    { id: 'hazelnut', name: 'Лесной орех', price: 30 },
    { id: 'chocolate', name: 'Шоколадный', price: 35 },
    { id: 'coconut', name: 'Кокосовый', price: 35 }
  ];

  // Подсчёт итоговой цены
  const calculateTotalPrice = () => {
    let total = sizePrices[size].price;
    
    // Добавляем стоимость альтернативного молока
    if (milkType !== 'regular') {
      total += milkPrices[milkType].price;
    }
    
    // Добавляем стоимость сиропов
    syrups.forEach(syrup => {
      const option = syrupOptions.find(s => s.id === syrup);
      if (option) total += option.price;
    });
    
    // Добавляем стоимость дополнительного шота
    if (extraShot) total += 50;
    
    // Добавляем стоимость взбитых сливок
    if (whippedCream) total += 40;
    
    return total;
  };

  // Обработчик добавления сиропа/удаления
  const toggleSyrup = (syrupId) => {
    setSyrups(prev => 
      prev.includes(syrupId) 
        ? prev.filter(id => id !== syrupId)
        : [...prev, syrupId]
    );
  };

  // Обработчик добавления в корзину с настройками
  const handleAddToCart = () => {
    const customizationText = [];
    if (size !== 'medium') customizationText.push(sizePrices[size].label);
    if (milkType !== 'regular') customizationText.push(milkPrices[milkType].name);
    if (syrups.length > 0) {
      const syrupNames = syrups.map(s => syrupOptions.find(opt => opt.id === s)?.name);
      customizationText.push(`сиропы: ${syrupNames.join(', ')}`);
    }
    if (temperature === 'cold') customizationText.push('со льдом');
    if (extraShot) customizationText.push('доп. шот эспрессо');
    if (whippedCream) customizationText.push('взбитые сливки');
    if (comment) customizationText.push(`комментарий: ${comment}`);
    
    const customizedDrink = {
      ...drink,
      id: `${drink.id}-${Date.now()}`, // Уникальный ID для различающихся кастомизаций
      price: calculateTotalPrice(),
      volume: sizePrices[size].volume,
      customization: customizationText.join(', '),
      quantity: 1
    };
    
    addToCart(customizedDrink);
    navigate('/cart');
  };

  // Если напиток не найден
  if (!drink) {
    return (
      <div style={styles.notFound}>
        <h2>Напиток не найден</h2>
        <button onClick={() => navigate('/')} style={styles.button}>Вернуться в каталог</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Назад
      </button>
      
      <div style={styles.productContent}>
        {/* Левая колонка - изображение */}
        <div style={styles.imageSection}>
          <img src={drink.image} alt={drink.name} style={styles.image} />
        </div>
        
        {/* Правая колонка - информация и кастомизация */}
        <div style={styles.infoSection}>
          <h1 style={styles.name}>{drink.name}</h1>
          <p style={styles.description}>{drink.description}</p>
          <p style={styles.composition}><strong>Состав:</strong> {drink.composition}</p>
          <p style={styles.calories}>⚡ {drink.calories} ккал</p>
          
          {/* Блок кастомизации */}
          <div style={styles.customizationBlock}>
            <h3 style={styles.customizationTitle}>Настройте напиток</h3>
            
            {/* Выбор размера */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Размер порции:</label>
              <div style={styles.sizeButtons}>
                {Object.entries(sizePrices).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSize(key)}
                    style={{
                      ...styles.sizeButton,
                      ...(size === key ? styles.sizeButtonActive : {})
                    }}
                  >
                    {value.label}
                    <span style={styles.sizePrice}>{value.price} ₽</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Выбор молока */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Тип молока:</label>
              <div style={styles.milkButtons}>
                {Object.entries(milkPrices).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setMilkType(key)}
                    style={{
                      ...styles.milkButton,
                      ...(milkType === key ? styles.milkButtonActive : {})
                    }}
                  >
                    {value.name}
                    {value.price > 0 && <span style={styles.extraPrice}>+{value.price} ₽</span>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Выбор сиропов */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Сиропы:</label>
              <div style={styles.syrupButtons}>
                {syrupOptions.map(syrup => (
                  <button
                    key={syrup.id}
                    onClick={() => toggleSyrup(syrup.id)}
                    style={{
                      ...styles.syrupButton,
                      ...(syrups.includes(syrup.id) ? styles.syrupButtonActive : {})
                    }}
                  >
                    {syrup.name}
                    <span style={styles.extraPrice}>+{syrup.price} ₽</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Температура */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Температура:</label>
              <div style={styles.tempButtons}>
                <button
                  onClick={() => setTemperature('hot')}
                  style={{
                    ...styles.tempButton,
                    ...(temperature === 'hot' ? styles.tempButtonActive : {})
                  }}
                >
                  🔥 Горячий
                </button>
                <button
                  onClick={() => setTemperature('cold')}
                  style={{
                    ...styles.tempButton,
                    ...(temperature === 'cold' ? styles.tempButtonActive : {})
                  }}
                >
                  ❄️ Со льдом
                </button>
              </div>
            </div>
            
            {/* Дополнительные опции */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Добавки:</label>
              <div style={styles.extrasButtons}>
                <button
                  onClick={() => setExtraShot(!extraShot)}
                  style={{
                    ...styles.extraButton,
                    ...(extraShot ? styles.extraButtonActive : {})
                  }}
                >
                  ☕ Доп. шот эспрессо +50 ₽
                </button>
                <button
                  onClick={() => setWhippedCream(!whippedCream)}
                  style={{
                    ...styles.extraButton,
                    ...(whippedCream ? styles.extraButtonActive : {})
                  }}
                >
                  🍦 Взбитые сливки +40 ₽
                </button>
              </div>
            </div>
            
            {/* Комментарий к заказу */}
            <div style={styles.optionGroup}>
              <label style={styles.optionLabel}>Комментарий:</label>
              <textarea
                placeholder="Например: меньше сиропа, покрепче, без льда..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={styles.commentInput}
                rows="2"
              />
            </div>
          </div>
          
          {/* Итоговая цена и кнопка добавления */}
          <div style={styles.footer}>
            <div style={styles.totalPrice}>
              Итого: <span style={styles.totalPriceValue}>{calculateTotalPrice()} ₽</span>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    color: '#6F4E37',
    cursor: 'pointer',
    padding: '10px 0',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  notFound: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  productContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px'
  },
  imageSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '16px',
    objectFit: 'cover'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  name: {
    fontSize: '32px',
    color: '#6F4E37',
    margin: 0
  },
  description: {
    fontSize: '16px',
    color: '#666',
    lineHeight: 1.5
  },
  composition: {
    fontSize: '14px',
    color: '#888'
  },
  calories: {
    fontSize: '14px',
    color: '#888'
  },
  customizationBlock: {
    backgroundColor: '#f5f5f5',
    borderRadius: '16px',
    padding: '20px',
    marginTop: '10px'
  },
  customizationTitle: {
    fontSize: '20px',
    color: '#333',
    marginTop: 0,
    marginBottom: '20px'
  },
  optionGroup: {
    marginBottom: '20px'
  },
  optionLabel: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#555'
  },
  sizeButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  sizeButton: {
    padding: '10px 16px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  sizeButtonActive: {
    borderColor: '#6F4E37',
    backgroundColor: '#F5E6D3',
    borderWidth: '2px'
  },
  sizePrice: {
    fontSize: '12px',
    color: '#6F4E37',
    fontWeight: 'bold'
  },
  milkButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  milkButton: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  milkButtonActive: {
    borderColor: '#6F4E37',
    backgroundColor: '#F5E6D3'
  },
  syrupButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  syrupButton: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  syrupButtonActive: {
    borderColor: '#6F4E37',
    backgroundColor: '#F5E6D3'
  },
  tempButtons: {
    display: 'flex',
    gap: '10px'
  },
  tempButton: {
    padding: '8px 20px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  tempButtonActive: {
    borderColor: '#6F4E37',
    backgroundColor: '#F5E6D3'
  },
  extrasButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  extraButton: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  extraButtonActive: {
    borderColor: '#6F4E37',
    backgroundColor: '#F5E6D3'
  },
  extraPrice: {
    fontSize: '11px',
    color: '#6F4E37',
    marginLeft: '5px'
  },
  commentInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'inherit',
    fontSize: '14px',
    resize: 'vertical'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    marginTop: '10px'
  },
  totalPrice: {
    fontSize: '18px',
    color: '#666'
  },
  totalPriceValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#6F4E37'
  },
  addToCartButton: {
    backgroundColor: '#6F4E37',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  button: {
    backgroundColor: '#6F4E37',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default ProductPage;