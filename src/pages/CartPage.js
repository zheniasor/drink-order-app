import React from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cart, removeFromCart, updateQuantity, getTotalPrice }) {
  if (cart.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте напитки, чтобы оформить заказ</p>
        <Link to="/" style={styles.button}>Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Корзина</h1>
      
      <div style={styles.cartContent}>
        <div style={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemVolume}>{item.volume} л</p>
                <p style={styles.itemPrice}>{item.price} ₽ × {item.quantity}</p>
              </div>
              
              <div style={styles.itemControls}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.quantityBtn}
                >-</button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityBtn}
                >+</button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeBtn}
                >✖</button>
              </div>
              
              <div style={styles.itemTotal}>
                <strong>{item.price * item.quantity} ₽</strong>
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
            <span>{getTotalPrice()} ₽</span>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  title: {
    marginBottom: '30px',
    color: '#6F4E37'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666'
  },
  cartContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '30px'
  },
  cartItems: {
    border: '1px solid #eee',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
    gap: '15px'
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    margin: 0,
    fontSize: '16px'
  },
  itemVolume: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#666'
  },
  itemPrice: {
    margin: 0,
    fontSize: '14px',
    color: '#999'
  },
  itemControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  quantityBtn: {
    width: '32px',
    height: '32px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px'
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    fontSize: '18px'
  },
  itemTotal: {
    minWidth: '80px',
    textAlign: 'right'
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    height: 'fit-content'
  },
  summaryTitle: {
    marginTop: 0,
    marginBottom: '20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  checkoutBtn: {
    display: 'block',
    backgroundColor: '#6F4E37',
    color: 'white',
    textAlign: 'center',
    padding: '12px',
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '20px',
    fontWeight: 'bold'
  },
  continueBtn: {
    display: 'block',
    backgroundColor: 'transparent',
    color: '#6F4E37',
    textAlign: 'center',
    padding: '12px',
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '10px',
    border: '1px solid #6F4E37'
  }
};

export default CartPage;