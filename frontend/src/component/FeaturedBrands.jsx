import React from 'react';
import Title from './Title';

const FeaturedBrands = () => {
  const brands = [
    {
      name: 'Nike',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
      description: 'Just Do It',
      featured: true,
    },
    {
      name: 'Adidas',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png',
      description: 'Impossible is Nothing',
      featured: true,
    },
    {
      name: 'Jordan',
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/Jordan-Logo.png',
      description: 'Fly High',
      featured: true,
    },
    {
      name: 'Puma',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png',
      description: 'Forever Faster',
      featured: true,
    },
    {
      name: 'Converse',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Converse-Logo.png',
      description: 'All Star',
      featured: true,
    },
    {
      name: 'Vans',
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Vans-Logo.png',
      description: 'Off The Wall',
      featured: true,
    },
  ];

  return (
    <div className="w-full px-0 sm:px-2">
      <div className="mx-auto w-full max-w-7xl">
        {/* Featured Brands Section */}
        <div className="py-8 text-center text-3xl">
          <Title text1={'FEATURED'} text2={'BRANDS'} />
          <p className="m-auto w-full text-sm text-gray-600 sm:w-3/4 sm:text-sm md:text-base">
            Discover premium sneakers from the world's most iconic brands. Each pair tells a story
            of innovation, style, and authentic craftsmanship.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="mx-auto w-full max-w-7xl pb-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-6">
            {brands.map((brand, index) => (
              <div
                key={brand.name + index}
                className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col items-center p-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-50 transition-colors group-hover:bg-neutral-100">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-8 w-8 object-contain grayscale filter transition-all duration-300 group-hover:grayscale-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-lg font-bold text-black">
                      {brand.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 transition-colors group-hover:text-black">
                    {brand.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600">{brand.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
