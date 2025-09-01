import React, { useEffect, useState } from 'react';
// import { useStore } from '../context/StoreContext.jsx';
import { products } from '../assets/assets.js';
import Card from '../component/Card.jsx';
import Title from '../component/Title.jsx';
import dropDown from '../assets/dropdown_icon.png';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  // const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [sortType, setSortType] = useState('relevant');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  // Filter products based on selected criteria
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === 'all' || (product.tags?.includes(selectedCategory) ?? false);
    const genderMatch = selectedGender === 'all' || product.gender === selectedGender;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return categoryMatch && genderMatch && brandMatch;
  });

  const brands = [...new Set(products.map((product) => product.brand))];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Run once in case user already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === 'low-high') {
      return a.price - b.price;
    }
    if (sortType === 'high-low') {
      return b.price - a.price;
    }
    return 0; // "relevant" means no sorting, keep original order
  });

  return (
    <>
      <div className="mb-5 sm:mb-10">
        <div className="w-full py-1">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left Sidebar - Filters */}
            <div className="w-full lg:w-80">
              <div className="rounded-lg border-black bg-neutral-200/40 p-4 shadow-sm sm:border dark:border-neutral-800">
                <div className="mb-1 flex items-center justify-between lg:mb-3">
                  <h2 className="text-xl tracking-wide text-neutral-900 sm:font-semibold">
                    Filters
                  </h2>
                  <img
                    src={dropDown}
                    alt="drop down icon"
                    onClick={() => setShowFilter(!showFilter)}
                    className={`block h-auto w-6 cursor-pointer lg:hidden ${showFilter ? '' : '-rotate-90'}`}
                  />
                </div>
                {/* Gender Filter */}
                <div className={`mb-6 ${showFilter ? '' : 'hidden'} lg:block`}>
                  <h3 className="mb-3 text-sm font-medium text-black">Gender</h3>
                  <div className="space-y-2">
                    {['all', 'men', 'women', 'kids'].map((gender) => (
                      <label key={gender} className="flex cursor-pointer items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={selectedGender === gender}
                          onChange={(e) => {
                            setSelectedGender(e.target.value);
                          }}
                          className="h-4 w-4 cursor-pointer text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm text-black capitalize">
                          {gender === 'all' ? 'All' : gender}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className={`mb-6 ${showFilter ? '' : 'hidden'} lg:block`}>
                  <h3 className="mb-3 text-sm font-medium text-black">Category</h3>
                  <div className="space-y-2">
                    {['all', 'running', 'lifestyle', 'trainer', 'trail'].map((category) => (
                      <label key={category} className="flex cursor-pointer items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                          }}
                          className="h-4 w-4 cursor-pointer text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm text-black capitalize">
                          {category === 'all' ? 'All' : category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className={`mb-3 sm:mb-5 ${showFilter ? '' : 'hidden'} lg:block`}>
                  <h3 className="mb-3 text-sm font-medium text-black">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                            }
                          }}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm text-black">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setSelectedBrands([]);
                    setShowFilter(false);
                  }}
                  className={`${showFilter ? '' : 'hidden'} mb-2 w-full cursor-pointer rounded-md bg-black/55 px-4 py-3 text-base font-medium tracking-wide text-white transition-colors hover:bg-neutral-200 lg:block dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600`}
                >
                  Clear Filters
                </button>
                {/* Ok Filter for mobile */}
                {showFilter && (
                  <button
                    onClick={() => setShowFilter(false)}
                    className={`${showFilter ? '' : 'hidden'} w-full cursor-pointer rounded-md bg-[#B4E140] px-4 py-3 text-sm font-medium tracking-wide text-neutral-700 transition-colors hover:bg-neutral-200 lg:block dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600`}
                  >
                    OK
                  </button>
                )}
              </div>
            </div>

            {/* Right Section - Products */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col items-center justify-between text-3xl sm:flex-row">
                <Title text1={'OUR'} text2={'COLLECTIONS'} />
                {/* Filter by price */}
                <select
                  onChange={(e) => setSortType(e.target.value)}
                  className="w-3/4 cursor-pointer border border-gray-600 px-4 py-2 text-center text-sm outline-none sm:w-auto"
                >
                  <option value="relevant">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
              </div>
              <div className="mt-4 mb-4 flex items-center justify-between sm:mt-0">
                <p className="text-sm text-neutral-600 dark:text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <Card
                      // key={product.id || product.sku || index}
                      key={product.id}
                      product={product}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 text-lg text-gray-600">
                  <p className="text-center"> No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-5 z-50 flex items-center justify-center rounded-full bg-black p-3 text-white shadow-lg transition-all duration-300 hover:bg-gray-800 sm:right-10 sm:bottom-10"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default Collection;
