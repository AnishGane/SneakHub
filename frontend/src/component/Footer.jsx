import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-2 mb-3 bg-gray-50 text-gray-700 sm:mt-8">
      {/* Top Section */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-4 sm:flex-row sm:items-start sm:justify-between sm:py-10">
        {/* Brand & Description */}
        <div className="max-w-md">
          <Link to="/" className="text-2xl font-light">
            SNEAK<span className="font-semibold">HUB</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Discover the best sneakers with SneakHub. Stay updated with the latest collections and
            trends. Quality, comfort, and style all in one place.
          </p>
          {/* Social Icons */}
          <div className="mt-4 flex space-x-4">
            <a href="#" className="transition hover:text-black">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="transition hover:text-black">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="transition hover:text-black">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="transition hover:text-black">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase">
              Shop
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-black">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Men
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Women
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-600 uppercase">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} SneakHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
