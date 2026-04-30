import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/sheets';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const price250g = Math.round(product.price_500g * 0.55);
  const price500g = product.price_500g;
  const price750g = Math.round(product.price_500g * 1.4);
  const price1kg = product.price_1kg;

  const getPrice = (size) => {
    switch(size) {
      case '250g': return price250g;
      case '500g': return price500g;
      case '750g': return price750g;
      case '1kg': return price1kg;
      default: return price500g;
    }
  };

  const price = getPrice(selectedSize);
  const total = price * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, selectedSize, quantity);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-amber-500 text-white text-sm font-semibold rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>
          </div>

          <div className="p-8 flex flex-col">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider mb-2">
              {product.category} Honey
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">{product.name}</h2>
            
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-500 text-sm ml-2">(5.0)</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Size</label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedSize('250g')}
                  className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedSize === '250g'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="block text-xs opacity-70">250g</span>
                  <span className="text-base">₹{price250g}</span>
                </button>
                <button
                  onClick={() => setSelectedSize('500g')}
                  className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedSize === '500g'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="block text-xs opacity-70">500g</span>
                  <span className="text-base">₹{price500g}</span>
                </button>
                <button
                  onClick={() => setSelectedSize('750g')}
                  className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedSize === '750g'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="block text-xs opacity-70">750g</span>
                  <span className="text-base">₹{price750g}</span>
                </button>
                <button
                  onClick={() => setSelectedSize('1kg')}
                  className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedSize === '1kg'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="block text-xs opacity-70">1kg</span>
                  <span className="text-base">₹{price1kg}</span>
                </button>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-2xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Total</span>
                <span className="text-3xl font-bold text-amber-600">₹{total}</span>
              </div>
              <button
                className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isAdding 
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/40 hover:scale-[1.02]'
                }`}
                onClick={handleAddToCart}
              >
                {isAdding ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { dispatch } = useCart();

  const handleAddToCart = (product, size, qty) => {
    const price = size === '500g' ? product.price_500g : product.price_1kg;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        size: size,
        price: price,
        quantity: qty,
        image: product.image
      }
    });
  };

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data.slice(0, 4));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="text-amber-700 font-medium">Loading premium honey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 pb-20">
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full uppercase tracking-wider mb-4">
              Featured Collection
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">
              Our Best Sellers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most loved honey varieties, crafted for those who appreciate 
              the finest natural sweetness.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-slide-in-right"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard 
                  product={product} 
                  onProductClick={setSelectedProduct}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=500&fit=crop"
                alt="Natural honey beekeeping"
                className="relative rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Natural</div>
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full uppercase tracking-wider mb-4">
                Why NectorNest
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-gray-900 mb-6">
                Pure Honey, Pure Promise
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At NectorNest, we believe in the power of nature. Our honey is harvested 
                sustainably, processed minimally, and delivered fresh. Every jar captures 
                the essence of pristine forests and blooming meadows.
              </p>

              <div className="space-y-4">
                {[
                  { icon: '🌿', title: '100% Raw & Unprocessed', desc: 'Straight from the hive to your table' },
                  { icon: '🏔️', title: 'Sourced from Pristine Forests', desc: 'Ethical beekeeping practices' },
                  { icon: '🚫', title: 'No Added Sugars', desc: 'Pure natural sweetness' },
                  { icon: '📦', title: 'Free Shipping', desc: 'On orders above ₹500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
            Ready to Taste Nature's Sweetness?
          </h3>
          <p className="text-white/90 text-lg mb-8">
            Order now and experience the pure joy of natural honey.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-600 font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Shop Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}