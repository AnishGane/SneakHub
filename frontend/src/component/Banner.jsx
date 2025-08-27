import React from 'react';
import BannerImage from '../assets/Banner.jpeg';

const Banner = () => {
  return (
    <div className="flex h-140 w-full rounded-[8px] bg-gray-200">
      {/* Left Div */}
      <div className="flex"></div>
      {/* Right Div */}
      <div className="w-3/4">
        {/* <img src={BannerImage} alt="banner image" className="h-full w-full object-contain" /> */}
      </div>
    </div>
  );
};

export default Banner;
