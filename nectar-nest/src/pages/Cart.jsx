import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

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
      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-honey-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">🍯</span>
          </div>
          <h2 className="font-display text-3xl text-earth mb-4">Your Cart is Empty</h2>
          <p className="text-earth/70 mb-8">
            Looks like you haven't added any honey to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-honey-500 text-white font-semibold rounded-full hover:bg-honey-600 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-display text-3xl text-earth mb-8">Your Cart</h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {state.items.map((item, index) => (
            <div
              key={`${item.id}-${item.size}`}
              className={`flex items-center gap-4 p-4 ${
                index !== state.items.length - 1 ? 'border-b border-honey-100' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-earth">{item.name}</h3>
                <p className="text-sm text-earth/60">{item.size}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item, item.quantity - 1)}
                  className="w-8 h-8 bg-honey-100 rounded-lg flex items-center justify-center text-earth hover:bg-honey-200"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item, item.quantity + 1)}
                  className="w-8 h-8 bg-honey-100 rounded-lg flex items-center justify-center text-earth hover:bg-honey-200"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <div className="font-semibold text-earth">₹{item.price * item.quantity}</div>
                <button
                  onClick={() => removeItem(item)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-earth/70">Subtotal</span>
            <span className="text-xl font-semibold text-earth">₹{state.total}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-earth">Total</span>
            <span className="text-2xl font-bold text-honey-600">₹{state.total}</span>
          </div>
          <Link
            to="/checkout"
            className="block w-full py-4 bg-honey-500 text-white font-semibold text-center rounded-xl hover:bg-honey-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}