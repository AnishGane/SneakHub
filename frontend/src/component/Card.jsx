import React from 'react';

const Card = ({ product, onClick }) => {
  return (
    <article
      key={product.id}
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
    >
      {/* Badge */}
      {product.isNewArrival && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
          New
        </div>
      )}
      {product.isBestSeller && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
          Best
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Discount badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm sm:top-4 sm:right-4 sm:px-3 sm:py-1.5 sm:text-sm">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6">
        {/* Brand */}
        <p className="text-xs font-light tracking-wide text-neutral-500 uppercase sm:text-sm dark:text-neutral-400">
          {product.brand}
        </p>

        {/* Product name */}
        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold text-neutral-900 transition-colors group-hover:text-neutral-600 sm:mt-2 sm:text-base dark:text-white dark:group-hover:text-neutral-300">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(product.rating.average)
                    ? 'text-amber-400'
                    : 'text-neutral-300 dark:text-neutral-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
            ({product.rating.count})
          </span>
        </div>

        {/* Price section */}
        <div className="mt-0 flex flex-col items-center justify-between gap-1 sm:mt-3 sm:flex-col sm:gap-2 md:mt-4 md:flex-col md:gap-2 lg:flex-row lg:gap-0">
          <div className="flex w-full items-center justify-between gap-1 sm:w-auto sm:gap-3">
            <span className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-neutral-500 line-through sm:text-base dark:text-neutral-400">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          <div
            className={`w-full rounded-full px-5 py-2 text-center text-xs sm:px-3 sm:py-1.5 sm:text-sm md:w-full lg:w-auto ${
              product.stock > 20
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : product.stock > 5
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            }`}
          >
            {product.stock > 20
              ? 'In Stock'
              : product.stock > 5
                ? `${product.stock} left`
                : 'Low Stock'}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
