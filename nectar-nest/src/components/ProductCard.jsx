import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState('500g');
  const { dispatch } = useCart();

  const price = selectedSize === '500g' ? product.price_500g : product.price_1kg;

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        size: selectedSize,
        price: price,
        quantity: 1,
        image: product.image
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-honey-500 text-white text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl text-earth mb-2">{product.name}</h3>
        <p className="text-earth/70 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedSize('500g')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedSize === '500g'
                ? 'bg-honey-500 text-white'
                : 'bg-honey-50 text-earth hover:bg-honey-100'
            }`}
          >
            500g - ₹{product.price_500g}
          </button>
          <button
            onClick={() => setSelectedSize('1kg')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedSize === '1kg'
                ? 'bg-honey-500 text-white'
                : 'bg-honey-50 text-earth hover:bg-honey-100'
            }`}
          >
            1kg - ₹{product.price_1kg}
          </button>
        </div>

        <button
          onClick={addToCart}
          disabled={!product.in_stock}
          className="w-full py-3 bg-earth text-white font-semibold rounded-xl hover:bg-honey-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}