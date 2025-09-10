import React from 'react';
import Banner from '../component/Banner';
import NewArrival from '../component/NewArrival.jsx';
import FeaturedBrands from '../component/FeaturedBrands.jsx';

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <NewArrival />
        <FeaturedBrands />
      </div>
    </>
  );
};

export default Home;
