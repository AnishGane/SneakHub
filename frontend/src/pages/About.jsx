import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaShoePrints, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative flex w-full flex-col items-center justify-between gap-4 bg-gray-100 px-6 py-4 sm:flex-row sm:py-10 md:flex-col lg:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 flex-col items-center gap-4 sm:gap-6">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">About Us</h1>
            <p className="mt-2 text-base text-gray-600">
              Redefining sneaker culture with passion, authenticity, and modern style. At SneakHub,
              we believe shoes are more than fashion — they’re a lifestyle.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1549298916-f52d724204b4?auto=format&fit=crop&w=800&q=80"
              alt="Sneakers"
              className="rounded-lg shadow-lg lg:max-w-lg"
            />
          </div>
        </div>
        {/* Mission section */}
        <div className="grid w-full gap-10 sm:w-1/2 sm:items-center">
          <div className="w-full">
            <h2 className="text-2xl font-medium sm:text-3xl">Our Mission</h2>
            <p className="mt-2 leading-relaxed text-gray-600 sm:mt-4">
              Our mission is simple — to bring you the latest and most exclusive sneakers while
              keeping quality and authenticity at the core. SneakHub exists to connect sneaker
              enthusiasts, collectors, and everyday wearers who value both comfort and style.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-[#F9A400]" /> 100% Authentic Sneakers
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-[#F9A400]" /> Handpicked Latest Collections
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-[#F9A400]" /> Comfort + Streetwear Style
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-[#F9A400]" /> Handpicked Latest Collections
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="py-1 text-3xl leading-10 font-semibold">
            What Makes <span className="rounded-[4px] bg-black px-2 py-1 text-white">SneakHub</span>{' '}
            Different?
          </h2>
          <div className="mt-4 grid gap-10 sm:mt-10 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <FaShoePrints className="mx-auto text-3xl text-[#F9A400]" />
              <h3 className="mt-4 text-lg font-semibold">Unique Collection</h3>
              <p className="mt-2 text-sm text-gray-600">
                We curate sneakers that blend classic styles with modern trends — limited drops,
                rare finds, and timeless icons.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <FaUsers className="mx-auto text-3xl text-[#F9A400]" />
              <h3 className="mt-4 text-lg font-semibold">Community Driven</h3>
              <p className="mt-2 text-sm text-gray-600">
                SneakHub is more than a brand — it’s a community of sneaker lovers, creators, and
                streetwear culture enthusiasts.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <FaAward className="mx-auto text-3xl text-[#F9A400]" />
              <h3 className="mt-4 text-lg font-semibold">Quality Guaranteed</h3>
              <p className="mt-2 text-sm text-gray-600">
                Every pair is checked for comfort, durability, and premium design — only the best
                for SneakHub’s family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-5xl px-6 py-10 text-center">
        <h2 className="py-1 text-3xl leading-10 font-semibold">
          Step into the{' '}
          <span className="rounded-[4px] bg-black px-2 py-1 text-white">Future of Sneakers</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Join thousands of sneakerheads who trust SneakHub for the latest styles and timeless
          classics.
        </p>
        <Link
          to="/collection"
          className="mt-6 inline-block rounded-md bg-black px-6 py-3 font-medium text-white shadow-lg transition hover:scale-105 hover:bg-black/90"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default About;
