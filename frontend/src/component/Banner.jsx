import React from 'react';
import BannerImage from '../assets/Banner2.jpeg';

const Banner = () => {
  return (
    <div className="flex h-140 w-full flex-col rounded-[8px] bg-gray-300 sm:flex-row">
      {/* Left Div */}
      <div className="flex-1"></div>
      {/* Right Div */}
      <div className="w-1/2">
        <img src={BannerImage} alt="banner image" className="h-full w-full object-contain" />
      </div>
    </div>
  );
};

export default Banner;
