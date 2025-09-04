import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../assets/assets.js';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);

  const fetchProducts = async () => {
    setProductData(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    productData,
    setProductData,
    fetchProducts,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
