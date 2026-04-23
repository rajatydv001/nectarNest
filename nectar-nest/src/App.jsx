import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Admin from './pages/Admin';

function Home() {
  return (
    <>
      <Hero />
      <Shop />
      <footer className="bg-earth text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full honey-gradient flex items-center justify-center">
                  <span className="text-white text-xl">🍯</span>
                </div>
                <span className="font-display text-xl">NectorNest</span>
              </div>
              <p className="text-white/70 text-sm">
                Pure, raw, and natural honey delivered straight from the hive to your table.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="/" className="hover:text-white">Shop</a></li>
                <li><a href="/#about" className="hover:text-white">About Us</a></li>
                <li><a href="/admin" className="hover:text-white">Admin</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-white/70 text-sm">
                Email: hello@nectarnest.com<br />
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50 text-sm">
            © 2024 NectorNest. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;