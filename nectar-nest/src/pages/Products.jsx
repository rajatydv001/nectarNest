import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/sheets';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Premium', 'Organic', 'Ayurvedic', 'Wellness'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm font-medium uppercase tracking-wider mb-4">
            Our Collection
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">
            Premium Honey Varieties
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover our range of pure, raw honeys. Each variety has unique flavors and health benefits.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <Link 
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-32 sm:h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.id === 'ginger-lollipop' ? '/photo2.png' : (product.image || '/photo1.jpg')}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-2">
                  {product.category}
                </span>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-600">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-amber-600">₹{product.price_500g}</span>
                    <span className="text-xs text-gray-500 ml-1">{product.id === 'ginger-lollipop' ? '/ 1 unit' : '/ 500g'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}