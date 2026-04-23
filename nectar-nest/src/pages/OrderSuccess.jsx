import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-earth/70">No order found.</p>
          <Link to="/" className="text-honey-600 hover:underline mt-4 inline-block">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-display text-3xl text-earth mb-4">Order Confirmed!</h1>
        <p className="text-earth/70 mb-8">
          Thank you for your order. We've sent a confirmation email to {order.email}
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-left mb-8">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-honey-100">
            <span className="text-sm text-earth/60">Order ID</span>
            <span className="font-semibold text-honey-600">{order.order_id}</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-earth/70">Name</span>
              <span className="text-earth">{order.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth/70">Phone</span>
              <span className="text-earth">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth/70">Address</span>
              <span className="text-earth text-right">{order.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-earth/70">Total</span>
              <span className="font-semibold text-honey-600">₹{order.total}</span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-block px-8 py-4 bg-honey-500 text-white font-semibold rounded-full hover:bg-honey-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}