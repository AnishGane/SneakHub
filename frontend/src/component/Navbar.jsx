import React from 'react';
import Logo from '../assets/MainLogo.png';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCartOutline, IoMenu, IoClose } from 'react-icons/io5';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [hovered, setHovered] = React.useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <div className="relative mt-3 flex h-20 w-full items-center justify-between bg-red-400 px-3 md:px-4">
      {/* Logo */}
      <Link to="/" className="justify-self-start">
        <img src={Logo} alt="SneakHub logo" className="mt-4 block h-10 w-auto" />
      </Link>

      {/* Middle Nav */}
      <ul className="hidden items-center md:flex">
        {navLinks.map((link, idx) => (
          <li key={link.to}>
            <NavLink
              key={idx}
              to={link.to}
              className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 text-sm"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 0);
              }}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="absolute inset-0 h-full w-full rounded-md bg-black/15"
                ></motion.span>
              )}
              {}
              <span className="relative z-10 text-[16px] tracking-wide uppercase">
                {link.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Nav */}
      <div className="flex items-center gap-4 justify-self-end pr-1 md:gap-6 md:pr-2">
        <SignedOut>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="hidden cursor-pointer rounded-[4px] border-1 border-black px-6 py-2 text-[15px] tracking-wide hover:bg-neutral-100 md:inline-block"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="hidden cursor-pointer rounded-[4px] bg-black px-6 py-2 text-[15px] tracking-wide text-white hover:opacity-90 md:inline-block"
            >
              Sign up
            </button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="relative hidden md:block">
            <IoCartOutline
              onClick={() => navigate('/cart')}
              className="h-auto w-7 cursor-pointer"
            />
            <span className="absolute -right-1 bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
              10
            </span>
          </div>
          <UserButton
            appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8' } }}
            signOutRedirectUrl="/"
          />
        </SignedIn>
        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="inline-flex cursor-pointer items-center justify-center p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose className="h-7 w-7" /> : <IoMenu className="h-7 w-7" />}
        </button>
      </div>
      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-20 right-0 left-0 z-50 h-[87dvh] border-t border-neutral-200 bg-white/60 shadow-sm backdrop-blur-2xl backdrop-saturate-150 md:hidden">
          <ul className="flex flex-col py-2">
            {navLinks.map((link, idx) => (
              <li key={`m-${link.to}`}>
                <NavLink
                  to={link.to}
                  className="block px-4 py-3 text-[15px] tracking-wide uppercase"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3">
            <SignedOut>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/login');
                  }}
                  className="flex-1 cursor-pointer rounded-[4px] border-1 border-black px-4 py-3 text-sm hover:bg-neutral-100"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="flex-1 cursor-pointer rounded-[4px] bg-black px-4 py-3 text-sm text-white hover:opacity-90"
                >
                  Sign up
                </button>
              </div>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/cart');
                }}
                className="inline-flex items-center gap-2 rounded-[4px] border-1 border-black px-3 py-2 text-sm"
              >
                <IoCartOutline className="h-5 w-5" /> Cart
              </button>
            </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
