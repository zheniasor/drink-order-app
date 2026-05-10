import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { drinks, categories } from '../data/menuData';
import { FiSearch } from 'react-icons/fi';

function HomePage({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredByCategory = selectedCategory === 'all' 
    ? drinks 
    : drinks.filter(drink => drink.category === selectedCategory);

  const filteredBySearch = filteredByCategory.filter(drink =>
    drink.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDrinks = [...filteredBySearch];
  if (sortBy === 'price-asc') {
    sortedDrinks.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedDrinks.sort((a, b) => b.price - a.price);
  }

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Ваш любимый напиток на заказ</h1>
        <p style={styles.bannerText}>Выберите из более чем 20 видов кофе, чая и других напитков</p>
      </div>

      {}
      <div style={styles.searchPanel}>
        <div style={styles.searchContainer}>
          <FiSearch size={20} color="#999" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск напитка..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={styles.searchClear}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {}
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

      {}
      {searchQuery && (
        <div style={styles.searchResultsInfo}>
          Найдено {sortedDrinks.length} напитков по запросу «{searchQuery}»
        </div>
      )}

      {}
      {sortedDrinks.length === 0 ? (
        <div style={styles.noResults}>
          <p>Ничего не найдено</p>
          <button onClick={() => setSearchQuery('')} style={styles.resetButton}>
            Очистить поиск
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {sortedDrinks.map(drink => (
            <ProductCard
              key={drink.id}
              drink={drink}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
  },
  banner: {
    backgroundColor: "#F5E6D3",
    padding: "48px 32px",
    textAlign: "center",
    borderRadius: "24px",
    marginBottom: "32px",
  },
  bannerTitle: {
    fontSize: "32px",
    fontWeight: 700,
    color: "#6F4E37",
    marginBottom: "12px",
  },
  bannerText: {
    fontSize: "16px",
    color: "#666",
  },
  searchPanel: {
    marginBottom: "24px",
  },
  searchContainer: {
    position: "relative",
    maxWidth: "400px",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "1.5px solid #E0E0E0",
    borderRadius: "40px",
    fontSize: "16px",
    backgroundColor: "white",
    transition: "all 0.2s ease",
    outline: "none",
  },
  searchClear: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: "16px",
    padding: "4px",
  },
  searchResultsInfo: {
    marginBottom: "20px",
    padding: "12px 16px",
    backgroundColor: "#F5E6D3",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#6F4E37",
  },
  filterPanel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  categories: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  categoryButton: {
    padding: "10px 24px",
    border: "1.5px solid #E0E0E0",
    backgroundColor: "white",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "all 0.25s ease",
  },
  categoryButtonActive: {
    backgroundColor: "#6F4E37",
    color: "white",
    borderColor: "#6F4E37",
    boxShadow: "0 2px 8px rgba(111, 78, 55, 0.3)",
  },
  sortSelect: {
    padding: "10px 20px",
    border: "1.5px solid #E0E0E0",
    borderRadius: "40px",
    backgroundColor: "white",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  noResults: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#666",
  },
  resetButton: {
    marginTop: "16px",
    padding: "10px 24px",
    backgroundColor: "#6F4E37",
    color: "white",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
  },
};

export default HomePage;