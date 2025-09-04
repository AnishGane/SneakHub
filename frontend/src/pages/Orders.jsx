import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';

const Orders = () => {
  const { productData } = useStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once in case user already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium">Your Orders</h1>
        <p className="text-base text-neutral-600">You have {productData.length} orders</p>
      </div>

      {/* Orders Data */}
      <div className="mt-8 flex flex-col gap-4">
        {productData.map((product) => (
          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">Quantity: 101</p>
              </div>
            </div>
            <p className="text-lg font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-5 z-50 flex cursor-pointer items-center justify-center rounded-full bg-black p-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-800 sm:right-10 sm:bottom-10"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Orders;
