import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-amber-50/50 to-orange-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-600 hover:underline mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h1 className="font-display text-4xl text-gray-900 mb-2">Shipping Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Shipping Rates</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Free Shipping</strong> - On all orders above ₹500</li>
                <li><strong>Flat Shipping Charge</strong> - ₹50 for orders below ₹500</li>
                <li>All prices are in Indian Rupees (₹)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Delivery Time</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Metro Cities</strong> - 3-5 business days</li>
                <li><strong>Other Cities</strong> - 5-7 business days</li>
                <li><strong>Remote Areas</strong> - 7-10 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Order Processing</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Orders are processed within 1-2 business days</li>
                <li>Orders placed before 12 PM are shipped the same day</li>
                <li>Tracking information is shared via email/SMS</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Delivery Areas</h2>
              <p>We deliver across India. For remote locations, delivery may take additional time. We'll contact you if your location is not serviceable.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Shipping Partners</h2>
              <p>We work with trusted delivery partners to ensure safe and timely delivery of your orders.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Order Tracking</h2>
              <p>Once your order is shipped, you'll receive a tracking number via email and SMS to track your package in real-time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Delivery Issues</h2>
              <p>If your package is delayed or damaged, please contact us within 48 hours at hello@nectarnest.com or call +91 98765 43210.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
              <p>For shipping-related queries, reach us at hello@nectarnest.com or call +91 98765 43210</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}