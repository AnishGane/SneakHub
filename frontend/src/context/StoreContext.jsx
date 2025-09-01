import React, { createContext, useContext, useState } from 'react';
// import { products } from '../assets/assets';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // const [products, setProducts] = useState(products);
  const value = { };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
