import React, { createContext, useContext, useState, useEffect } from 'react';
// import { products } from '../assets/assets.js';
import axios from 'axios';
const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState('');
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendURL}api/product/list`);
      console.log(response.data);
      if (response.data.success) {
        setProductData(response.data.products);
        console.log('fetchProducts:', response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // To Get the sungle product data
  const getSingleProductData = async (id) => {
    try {
      const response = await axios.get(`${backendURL}api/product/single/${id}`);
      console.log(response.data);
      if (response.data.success) {
        return response.data.product;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const searchProducts = async (q) => {
    try {
      if (!q) return [];
      const response = await axios.get(`${backendURL}api/product/search`, {
        params: { q },
      });
      if (response.data.success) {
        return response.data.products || [];
      }
      return [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  };

  // const handleAddToCart = (itemId, quantity, selectedSize, selectedColor) => {
  //   if (!selectedSize || !selectedColor) {
  //     alert('Please select both size and color');
  //     return;
  //   }
  //   // Add to cart logic here
  //   console.log('Adding to cart:', { itemId, selectedSize, selectedColor, quantity });
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    productData,
    setProductData,
    fetchProducts,
    getSingleProductData,
    search,
    setSearch,
    searchProducts,
    // handleAddToCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
