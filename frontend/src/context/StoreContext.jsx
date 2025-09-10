import React, { createContext, useContext, useState, useEffect } from 'react';
// import { products } from '../assets/assets.js';
import axios from 'axios';
const StoreContext = createContext(null);
import { toast } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

export const StoreProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState({});
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();

  // 1st
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

  // To Get the sungle product data (2nd)
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

  // 3rd
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

  // 5th Fetch user cart from backend and hydrate local cartItems
  const fetchCart = async () => {
    try {
      if (!user?.id) return;
      const res = await axios.post(`${backendURL}api/cart/get`, { userId: user.id });
      if (res.data?.success) {
        setCartItems(res.data.cart || {});
      }
    } catch (err) {
      console.error('Failed to fetch cart', err);
    }
  };

  //6th Update quantity for a specific line item
  const updateCartItem = async (productId, size, color, quantity) => {
    try {
      if (!user?.id) return;
      const qty = Math.max(0, Number(quantity) || 0);
      const res = await axios.post(`${backendURL}api/cart/update`, {
        userId: user.id,
        productId,
        size,
        color,
        quantity: qty,
      });
      if (res.data?.success) {
        setCartItems(res.data.cart || {});
      }
    } catch (err) {
      console.error('Failed to update cart item', err);
    }
  };

  // 7th
  const removeCartItem = async (productId, size, color) => {
    return updateCartItem(productId, size, color, 0);
  };

  //8th Compute totals from cartItems and productData
  const computeCartLines = React.useMemo(() => {
    // cartData is stored as keys like: productId_size_color => qty
    const flat = [];
    if (cartItems && typeof cartItems === 'object' && !Array.isArray(cartItems)) {
      // Support both nested object (productId -> size -> color) and flat keys
      Object.entries(cartItems).forEach(([k, v]) => {
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          // nested by size/color
          Object.entries(v).forEach(([sizeKey, colorsOrQty]) => {
            if (colorsOrQty && typeof colorsOrQty === 'object' && !Array.isArray(colorsOrQty)) {
              Object.entries(colorsOrQty).forEach(([colorKey, qty]) => {
                flat.push({
                  key: `${k}_${sizeKey}_${colorKey}`,
                  productId: k,
                  size: sizeKey,
                  color: colorKey,
                  qty: Number(qty) || 0,
                });
              });
            } else {
              flat.push({
                key: `${k}_${sizeKey}`,
                productId: k,
                size: sizeKey,
                color: 'default',
                qty: Number(colorsOrQty) || 0,
              });
            }
          });
        } else {
          // flat schema per server: cartData.productId_size_color => qty
          const [pid, sizeKey, colorKey] = k.split('_');
          flat.push({
            key: k,
            productId: pid,
            size: sizeKey,
            color: colorKey || 'default',
            qty: Number(v) || 0,
          });
        }
      });
    }
    return flat
      .map((line) => ({
        ...line,
        product: productData.find((p) => p._id === line.productId) || null,
      }))
      .filter((l) => l.product);
  }, [cartItems, productData]);

  const cartSubtotal = React.useMemo(() => {
    return computeCartLines.reduce((sum, l) => sum + (l.product?.price || 0) * (l.qty || 0), 0);
  }, [computeCartLines]);

  const cartItemCount = React.useMemo(() => {
    return computeCartLines.reduce((sum, l) => sum + (l.qty || 0), 0);
  }, [computeCartLines]);

  useEffect(() => {
    fetchCart();
  }, [user?.id]);

  // 4th - Add to Cart
  const addToCart = async (itemId, size, color, quantity) => {
    if (!size || !color || !quantity) {
      toast.error('Please select a size, color, and quantity');
      return;
    }
    const qty = Math.max(1, Number(quantity) || 1);

    const product = productData.find((p) => p._id === itemId);
    if (!product) {
      toast.error('Product not found');
      return;
    }

    if (!Array.isArray(product.sizes) || !product.sizes.includes(size)) {
      toast.error('Selected size is not available for this product');
      return;
    }

    try {
      const deepClone = (obj) =>
        typeof structuredClone === 'function'
          ? structuredClone(obj)
          : JSON.parse(JSON.stringify(obj));
      let nextCart = deepClone(cartItems);

      if (!nextCart[itemId]) nextCart[itemId] = {};
      if (!nextCart[itemId][size]) nextCart[itemId][size] = {};
      const colorKey = color || 'default';
      nextCart[itemId][size][colorKey] = (nextCart[itemId][size][colorKey] || 0) + qty;

      // Call backend if user is logged in (userId available)
      if (user?.id) {
        const response = await axios.post(`${backendURL}api/cart/add`, {
          userId: user.id,
          productId: itemId,
          size,
          color,
          quantity: qty,
        });
        if (!response.data?.success) {
          throw new Error(response.data?.message || 'Failed to add item to cart');
        }
      }

      setCartItems(nextCart);
      toast.success('Item added to cart successfully');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add item to cart');
    }
  };

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
    cartItems,
    setCartItems,
    fetchCart,
    updateCartItem,
    removeCartItem,
    computeCartLines,
    cartSubtotal,
    cartItemCount,
    addToCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

export default StoreContext;
