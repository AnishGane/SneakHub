import React from 'react';
import BannerImage from '../assets/Banner2.jpeg';
import BannerImage1 from '../assets/BannerShoe.jpeg';

const Banner = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-white p-6 shadow-sm sm:p-8 md:p-10 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
      {/* Decorative blur blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/20" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-rose-200/40 blur-3xl dark:bg-rose-500/20" />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 md:flex-col md:items-center lg:flex-row lg:items-center lg:justify-between">
        {/* Left: copy */}
        <div className="ml-3 max-w-xl text-center sm:ml-10 md:ml-5 md:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            New arrivals just dropped
          </div>
          <h1 className="mt-2 text-3xl leading-tight font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Elevate your style with the latest sneakers
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
            Discover curated collections from top brands. Lightweight, breathable, and built for
            everyday comfort.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <a
              href="#collection"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 sm:w-auto dark:bg-white dark:text-black"
            >
              Shop now
            </a>
            <a
              href="#explore"
              className="inline-flex w-full items-center justify-center rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-100 sm:w-auto dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Explore collection
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Free shipping over $99
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-neutral-300 md:inline-block dark:bg-neutral-700" />
            <div className="text-xs text-neutral-500 dark:text-neutral-400">30-day returns</div>
          </div>
        </div>

        {/* Right: image */}
        <div className="group mx-autow-full relative max-w-md sm:max-w-2xl md:mr-10 md:max-w-md lg:max-w-md">
          {/* Outer gradient ring */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-300/50 via-transparent to-rose-300/50 opacity-70 blur-xl transition-opacity group-hover:opacity-90 dark:from-indigo-600/20 dark:to-rose-600/20" />

          {/* Card shell with tiny gradient border */}
          <div className="relative rounded-3xl bg-gradient-to-b from-neutral-200/70 to-white/60 p-[1px] shadow-xl dark:from-neutral-800/60 dark:to-neutral-900/60">
            <div className="relative overflow-hidden rounded-[22px] border border-neutral-200/70 bg-white/70 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60">
              {/* Floating badge */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-black/80 px-3 py-1 text-[12px] font-medium text-white shadow-sm backdrop-blur sm:top-4 sm:left-4 dark:bg-white/90 dark:text-black">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Trending
              </div>

              {/* Image with subtle tilt on md+ */}
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[16/9] md:h-auto lg:h-[360px]">
                {/* Background image */}
                <img
                  src={BannerImage}
                  alt="Featured sneaker collection"
                  className="h-full w-full scale-[1.02] object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-[1.05] md:rotate-0 lg:rotate-[1.25deg]"
                />

                {/* Decorative light streak */}
                <div className="pointer-events-none absolute top-10 -right-20 h-48 w-48 rotate-12 rounded-full bg-white/20 blur-3xl dark:bg-white/10" />
                {/* Text overlay */}
                <div className="absolute inset-x-3 bottom-3 z-10 sm:inset-x-4 sm:bottom-4">
                  <div className="inline-flex w-[70%] flex-col gap-1 rounded-2xl bg-black/65 px-3 py-2 text-white backdrop-blur sm:max-w-[90%] md:px-4 md:py-3 dark:bg-black/55">
                    <div className="flex items-center gap-2 text-[11px] font-medium sm:text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      Hype Drop '24
                    </div>
                    <h3 className="text-sm font-semibold tracking-tight sm:text-base md:text-lg">
                      Neon Pulse Runner
                    </h3>
                    <p className="block text-xs text-neutral-200">
                      Lightweight, responsive, and ready for the streets.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <a
                        href="#collection"
                        className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-black shadow-sm transition hover:opacity-90 dark:bg-neutral-100"
                      >
                        View Drop
                      </a>
                      <span className="inline text-[11px] text-neutral-300">#Limited</span>
                    </div>
                  </div>
                </div>

                {/* Bottom gradient fade for text legibility */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent dark:from-black/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
