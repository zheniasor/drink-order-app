import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import './styles/global.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? { name: 'Гость' } : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (drink) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === drink.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === drink.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...drink, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total.toFixed(2);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <Router>
      <Header cartCount={getCartCount()} />
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              getTotalPrice={getTotalPrice}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage 
              cart={cart}
              getTotalPrice={getTotalPrice}
              clearCart={clearCart}
            />
          } 
        />
        <Route 
          path="/order-confirmation" 
          element={<OrderConfirmationPage />} 
        />
        <Route 
          path="/profile" 
          element={<ProfilePage user={user} setUser={setUser} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;