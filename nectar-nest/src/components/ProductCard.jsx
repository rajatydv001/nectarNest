import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onProductClick }) {
  const [isAdding, setIsAdding] = useState(false);
  const { dispatch } = useCart();

  const isLollipop = product.id === 'ginger-lollipop';
  const price500g = product.price_500g;
  const price1kg = product.price_1kg;

  const addToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        size: isLollipop ? '1 unit' : '500g',
        price: isLollipop ? price500g : price500g,
        quantity: 1,
        image: isLollipop ? 'photo2.png' : (product.image || 'photo1.jpg')
      }
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-36 sm:h-48 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={isLollipop ? 'photo2.png' : (product.image || 'photo1.jpg')}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center">
            <span className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-xl font-semibold text-gray-900">{product.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-xl font-bold text-amber-600">₹{price500g}</span>
            <span className="text-xs text-gray-400 ml-1">for {isLollipop ? '1 unit' : '500g'}</span>
          </div>
        </div>

        <button
          onClick={addToCart}
          disabled={!product.in_stock}
          className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg hover:shadow-amber-500/40 hover:scale-[1.02]'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          {isAdding ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to Cart
            </>
          ) : product.in_stock ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add to Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-3">Tap to see more sizes & quantity</p>
      </div>
    </div>
  );
}