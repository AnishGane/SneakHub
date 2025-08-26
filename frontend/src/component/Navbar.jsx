import React from 'react'
import Logo from '../assets/MainLogo.png'
import { Link, NavLink } from 'react-router-dom'
import { motion } from "framer-motion";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [hovered, setHovered] = React.useState(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/collection", label: "Collection" },
        { to: "/about", label: "About Us" },
        { to: "/contact", label: "Contact Us" },
      ];

  return (
    <div className='w-full relative flex justify-between items-center h-20 mt-3 px-3 md:px-4'>
        {/* Logo */}
        <Link to="/">
            <img src={Logo} alt="SneakHub logo" className="w-40 h-auto " />
        </Link>

        {/* Middle Nav */}
        <ul className="hidden md:flex items-center">
            {navLinks.map((link,idx) => (
                <li key={link.to}>
                    <NavLink
                        key={idx}
                        to={link.to}
                        className="relative px-4 py-2 text-sm flex items-center justify-center gap-1 flex-col"
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                                setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                }, 0);
                            }}
                            >
                            {hovered === idx && (
                                <motion.span
                                    layoutId="hovered-span"
                                    className="absolute inset-0 h-full w-full rounded-md bg-neutral-200/70"
                                ></motion.span>
                            )}
                            {}
                            <span className="relative uppercase z-10 text-[16px] tracking-wide">{link.label}</span>
                        </NavLink>
                    </li>
            ))}
            </ul>

            {/* Right Nav */}
            <div className="flex items-center gap-4 md:gap-6 pr-1 md:pr-2">
                <SignedOut>
                    <div className='flex items-center gap-4'>
                        <button onClick={() => navigate('/login')} className="hidden md:inline-block cursor-pointer px-6 py-2 tracking-wide text-[15px] rounded-[4px] border-1 border-black hover:bg-neutral-100">Log in</button>
                        <button onClick={() => navigate('/signup')} className="hidden md:inline-block cursor-pointer px-6 py-2 tracking-wide text-[15px] rounded-[4px] bg-black text-white hover:opacity-90">Sign up</button>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className='relative hidden md:block'>
                        <IoCartOutline onClick={()=> navigate('/cart')} className='w-7 h-auto cursor-pointer ' />
                        <span className='absolute -right-1 bottom-0 text-[10px] bg-black text-white rounded-full w-4 h-4 flex justify-center items-center'>10</span>
                    </div>
                    <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8' } }} signOutRedirectUrl="/" />
                </SignedIn>
                {/* Mobile hamburger */}
                <button aria-label="Toggle menu" className="md:hidden inline-flex items-center justify-center p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <IoClose className='w-7 h-7' /> : <IoMenu className='w-7 h-7' />}
                </button>
            </div>
        {/* Mobile dropdown menu */}
        {isMenuOpen && (
            <div className="absolute left-0 right-0 top-20 z-50 md:hidden bg-white border-t border-neutral-200 shadow-sm">
                <ul className="flex flex-col py-2">
                    {navLinks.map((link, idx) => (
                        <li key={`m-${link.to}`}>
                            <NavLink
                                to={link.to}
                                className="block px-4 py-3 text-sm"
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
                <div className="border-t border-neutral-200 px-4 py-3 flex items-center justify-between">
                    <SignedOut>
                        <div className='flex w-full gap-3'>
                            <button onClick={() => { setIsMenuOpen(false); navigate('/login') }} className="flex-1 cursor-pointer px-4 py-2 text-sm rounded-[4px] border-1 border-black hover:bg-neutral-100">Log in</button>
                            <button onClick={() => { setIsMenuOpen(false); navigate('/signup') }} className="flex-1 cursor-pointer px-4 py-2 text-sm rounded-[4px] bg-black text-white hover:opacity-90">Sign up</button>
                        </div>
                    </SignedOut>
                    <SignedIn>
                            <button onClick={() => { setIsMenuOpen(false); navigate('/cart') }} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-[4px] border-1 border-black">
                                <IoCartOutline className='w-5 h-5' /> Cart
                            </button>
                    </SignedIn>
                </div>
            </div>
        )}
        </div>
  )
}

export default Navbar