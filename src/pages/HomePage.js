import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { drinks, categories } from '../data/menuData';

function HomePage({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Фильтрация напитков по категории
  const filteredDrinks = selectedCategory === 'all' 
    ? drinks 
    : drinks.filter(drink => drink.category === selectedCategory);

  // Сортировка напитков
  const sortedDrinks = [...filteredDrinks];
  if (sortBy === 'price-asc') {
    sortedDrinks.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedDrinks.sort((a, b) => b.price - a.price);
  }

  return (
    <div style={styles.container}>
      {/* Приветственный баннер */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Ваш любимый напиток на заказ</h1>
        <p style={styles.bannerText}>Выберите из более чем 20 видов кофе, чая и других напитков</p>
      </div>

      {/* Панель фильтрации и сортировки */}
      <div style={styles.filterPanel}>
        <div style={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === cat.id ? styles.categoryButtonActive : {})
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.sortSelect}
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">По возрастанию цены</option>
          <option value="price-desc">По убыванию цены</option>
        </select>
      </div>

      {/* Сетка карточек напитков */}
      <div style={styles.grid}>
        {sortedDrinks.map(drink => (
          <ProductCard 
            key={drink.id} 
            drink={drink} 
            onAddToCart={addToCart}
          />
        ))}
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
  banner: {
    backgroundColor: '#F5E6D3',
    padding: '40px',
    textAlign: 'center',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  bannerTitle: {
    fontSize: '32px',
    color: '#6F4E37',
    marginBottom: '10px'
  },
  bannerText: {
    fontSize: '18px',
    color: '#666'
  },
  filterPanel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  categories: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  categoryButton: {
    padding: '8px 16px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  categoryButtonActive: {
    backgroundColor: '#6F4E37',
    color: 'white',
    borderColor: '#6F4E37'
  },
  sortSelect: {
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  }
};

export default HomePage;