import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center bg-white pt-16 md:pt-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 text-xs sm:text-sm font-medium mb-4 md:mb-6">
              <span className="w-2 h-2 bg-gray-800 rounded-full"></span>
              Premium Quality Honey
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl text-gray-900 mb-4 md:mb-6 leading-tight">
              Pure Raw Honey
              <span className="block text-gray-600 text-xl sm:text-2xl lg:text-3xl mt-1">
                Straight from Nature
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-500 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              NectorNest brings you 100% pure, raw honey directly from trusted beekeepers. 
              Every purchase supports sustainable beekeeping and helps plant trees.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm md:text-base"
              >
                Shop Now
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm md:text-base"
              >
                Learn More
              </a>
            </div>

            <div className="mt-8 md:mt-10 flex items-center justify-center lg:justify-start gap-4 md:gap-8">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">500+</div>
                <div className="text-xs md:text-sm text-gray-500">Customers</div>
              </div>
              <div className="w-px h-6 md:h-8 bg-gray-200 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">4.9★</div>
                <div className="text-xs md:text-sm text-gray-500">Rating</div>
              </div>
              <div className="w-px h-6 md:h-8 bg-gray-200 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-xs md:text-sm text-gray-500">Trees Planted</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
              <img
                src="/photo1.jpg"
                alt="Pure Raw Honey"
                className="relative w-full h-full object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}