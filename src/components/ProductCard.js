import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ drink, onAddToCart }) {
  // Функция для быстрого добавления в корзину (без кастомизации)
  const handleQuickAdd = (e) => {
    e.preventDefault(); // Чтобы не переходить по ссылке
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
        <span style={styles.price}>{drink.price} ₽</span>
        <button 
          onClick={handleQuickAdd}
          style={styles.button}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333'
  },
  description: {
    fontSize: '14px',
    color: '#666',
    margin: '10px 0'
  },
  volume: {
    fontSize: '14px',
    color: '#999',
    margin: '5px 0'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    paddingTop: '10px',
    borderTop: '1px solid #eee'
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#6F4E37'
  },
  button: {
    backgroundColor: '#6F4E37',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  }
};

export default ProductCard;