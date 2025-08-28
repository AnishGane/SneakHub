import React from 'react';
import Title from './Title';
import Card from './Card';
import { getNewArrivals } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
const LatestCollection = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-2 w-full px-2 sm:mt-8">
      <div className="py-8 text-center text-3xl">
        <Title text1={'NEW'} text2={'ARIVALS'} />
        <p className="m-auto w-full text-sm text-gray-600 sm:w-3/4 sm:text-sm md:text-base">
          Discover our latest arrivals—fresh styles, premium materials, and standout designs from
          top brands. Find your next favorite pair in our curated collection.
        </p>
      </div>

      {/* Grid */}
      <div className="mx-auto w-full max-w-7xl pb-8">
        <div className="grid grid-cols-1 gap-8 px-1 sm:grid-cols-2 sm:gap-9 sm:px-2 md:grid-cols-3 lg:grid-cols-4">
          {getNewArrivals(8).map((product) => (
            <Card
              product={product}
              key={product.id}
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
