import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import React from 'react';
import Banner from '../component/Banner';
import { useStore } from '../context/StoreContext.jsx';

const Home = () => {
  const { isMenuOpen, setIsMenuOpen } = useStore();

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <div>
        <Banner />
      </div>
    </>
  );
};

export default Home;
