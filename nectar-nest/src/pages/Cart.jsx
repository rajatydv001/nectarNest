import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CouponInput from '../components/CouponInput';

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: item });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity: newQuantity } });
    }
  };

  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
              <span className="text-6xl">🍯</span>
            </div>
            <div className="absolute inset-0 bg-amber-200/30 rounded-full animate-pulse"></div>
          </div>
          <h2 className="font-display text-3xl text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any of our premium honey to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
          >
            Explore Collection
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-4xl text-gray-900 mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item, index) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={item.id === 'ginger-lollipop' ? '/photo2.png' : (item.image || '/photo1.jpg')}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.size}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 hover:bg-amber-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 hover:bg-amber-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="font-bold text-xl text-gray-900">₹{item.price * item.quantity}</div>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-sm text-red-500 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 text-lg mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{state.total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                {state.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{state.discount}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Apply Coupon</p>
                <CouponInput />
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="font-semibold text-gray-900">Total</span>
                <div className="text-right">
                  {state.discount > 0 && (
                    <span className="text-sm text-gray-400 line-through mr-2">₹{state.total}</span>
                  )}
                  <span className="text-3xl font-bold text-amber-600">₹{state.total - state.discount}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-center rounded-xl hover:shadow-lg hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/"
                className="block w-full mt-4 py-3 text-center text-gray-600 hover:text-amber-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}