import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../assets/assets.js';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);

  const fetchProducts = async () => {
    setProductData(products);
  };

  const handleAddToCart = (itemId, quantity, selectedSize, selectedColor) => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    // Add to cart logic here
    console.log('Adding to cart:', { itemId, selectedSize, selectedColor, quantity });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    productData,
    setProductData,
    fetchProducts,
    handleAddToCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
