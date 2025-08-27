import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const value = {};

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
