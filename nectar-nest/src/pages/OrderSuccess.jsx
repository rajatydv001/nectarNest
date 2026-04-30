import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-gray-600">No order found.</p>
          <Link to="/" className="text-amber-600 hover:underline mt-4 inline-block">
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-orange-50/30 pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center animate-scale-in">
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your order. We've sent a confirmation email to <span className="font-semibold text-amber-600">{order.email}</span>
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gray-500">Order ID</span>
            </div>
            <div className="text-2xl font-bold text-amber-600">{order.order_id}</div>
          </div>

          <div className="text-left bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Name</span>
                <span className="text-gray-900 font-medium">{order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-900">{order.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Address</span>
                <span className="text-gray-900 text-right">{order.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount</span>
                <span className="text-xl font-bold text-amber-600">₹{order.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
            >
              Continue Shopping
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}