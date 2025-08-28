import React from 'react';
import Title from './Title';
import Card from './Card';

const LatestCollection = () => {
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
        <Card />
      </div>
    </div>
  );
};

export default LatestCollection;
