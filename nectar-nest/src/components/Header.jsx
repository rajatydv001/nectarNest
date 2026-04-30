import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { state } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/cart', label: 'Cart' },
    { to: '/admin', label: 'Admin' },
  ];

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs py-1.5 text-center px-2">
          <span className="hidden sm:inline">🍯 Use code <span className="font-bold bg-white text-amber-600 px-2 py-0.5 rounded">NEW50</span> for 20% OFF | Free shipping above ₹500</span>
          <span className="sm:hidden">🍯 Code <span className="font-bold bg-white text-amber-600 px-1 rounded">NEW50</span> = 20% OFF</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
              <div className="relative">
                <img 
                  src="/logo.svg" 
                  alt="NectorNest" 
                  className="w-10 h-10 lg:w-12 lg:h-12"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl lg:text-2xl font-bold text-gray-900 tracking-wide">NectorNest</span>
                <p className="text-xs text-amber-600 -mt-1">Pure Honey</p>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search honey..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-amber-500 rounded-full hover:bg-amber-600 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to || (link.to === '/' && location.pathname === '/')
                      ? 'text-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                  {link.to === '/cart' && itemCount > 0 && (
                    <span className="ml-1.5 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <span className="font-serif text-lg text-amber-600 font-bold italic">NectorNest</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full hover:bg-amber-50 transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleMenu}
                className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={closeMenu}
          ></div>
          <div className="absolute right-0 top-0 h-full w-64 sm:w-72 bg-white shadow-xl flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="NectorNest" className="w-8 h-8" />
                <span className="font-bold text-lg text-gray-900">Menu</span>
              </div>
              <button 
                onClick={closeMenu} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search honey..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-amber-500 rounded-full hover:bg-amber-600 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                      location.pathname === link.to || (link.to === '/' && location.pathname === '/')
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.to === '/cart' && itemCount > 0 && (
                      <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-gray-100 bg-amber-50">
              <p className="text-xs font-semibold text-amber-700 uppercase mb-2">Contact Us</p>
              <div className="space-y-2 text-sm">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-600 hover:text-amber-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98765 43210
                </a>
                <a href="mailto:hello@nectarnest.com" className="flex items-center gap-2 text-gray-600 hover:text-amber-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@nectarnest.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}