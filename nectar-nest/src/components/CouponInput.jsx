import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CouponInput() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(false);
  const { state, dispatch } = useCart();

  const handleApply = () => {
    if (!code.trim()) {
      setMessage('Please enter a coupon code');
      return;
    }
    
    const originalDiscount = state.discount;
    dispatch({ type: 'APPLY_COUPON', payload: code });
    
    setTimeout(() => {
      if (state.discount > originalDiscount) {
        setMessage('Coupon applied successfully!');
        setApplied(true);
      } else {
        setMessage('Invalid or expired coupon');
        setApplied(false);
      }
    }, 100);
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    setCode('');
    setMessage('');
    setApplied(false);
  };

  if (state.coupon) {
    return (
      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <span className="font-semibold text-green-700">{state.coupon.description}</span>
            <span className="text-sm text-green-600 ml-2">(-₹{state.discount})</span>
          </div>
        </div>
        <button onClick={handleRemove} className="text-sm text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={handleApply}
          className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors text-sm"
        >
          Apply
        </button>
      </div>
      {message && (
        <p className={`text-sm ${applied ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}