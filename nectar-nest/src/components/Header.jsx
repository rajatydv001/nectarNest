import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { state } = useCart();
  const location = useLocation();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: '/', label: 'Shop' },
    { to: '/cart', label: 'Cart' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-honey-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full honey-gradient flex items-center justify-center">
              <span className="text-white text-xl">🍯</span>
            </div>
            <span className="font-display text-2xl text-honey-800">NectorNest</span>
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-honey-600'
                    : 'text-earth hover:text-honey-600'
                }`}
              >
                {link.label}
                {link.to === '/cart' && itemCount > 0 && (
                  <span className="ml-1 bg-honey-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}