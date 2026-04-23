import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/sheets';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-honey-200 border-t-honey-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-earth mb-4">Our Honey Collection</h2>
          <p className="text-earth/70 max-w-2xl mx-auto">
            Each variety is carefully sourced from trusted beekeepers, ensuring 
            the purest natural honey reaches your table.
          </p>
        </div>

        <div id="products" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div id="about" className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl text-earth mb-4">Why Choose NectorNest?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-earth/80">100% raw and unprocessed honey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-earth/80">Sourced from pristine forest areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-earth/80">No added sugars or preservatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-honey-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-earth/80">Free shipping on orders above ₹500</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop"
                alt="Natural honey"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-honey-500 text-white px-4 py-2 rounded-lg">
                <span className="font-semibold">Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}