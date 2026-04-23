import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-honey-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-amber-600 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-honey-300 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-honey-100 text-honey-700 rounded-full text-sm font-medium">
            100% Pure • Raw • Natural
          </span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl text-earth mb-6 leading-tight">
          Nature's Sweetest
          <span className="block honey-gradient bg-clip-text text-transparent">
            Gift to You
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-earth/80 mb-10 max-w-2xl mx-auto">
          Discover the purest honey from pristine forests. Hand-harvested, 
          unprocessed, and delivered fresh to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#products"
            className="px-8 py-4 bg-honey-500 hover:bg-honey-600 text-white font-semibold rounded-full transition-all hover:scale-105 honey-shadow"
          >
            Shop Now
          </Link>
          <Link
            to="/#about"
            className="px-8 py-4 border-2 border-honey-500 text-honey-700 hover:bg-honey-50 font-semibold rounded-full transition-all"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-earth/60">
          <div className="text-center">
            <div className="text-3xl font-bold text-honey-600">100%</div>
            <div className="text-sm">Pure</div>
          </div>
          <div className="w-px h-12 bg-earth/20"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-honey-600">500+</div>
            <div className="text-sm">Happy Customers</div>
          </div>
          <div className="w-px h-12 bg-earth/20"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-honey-600">4.9</div>
            <div className="text-sm">Rating</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-honey-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}