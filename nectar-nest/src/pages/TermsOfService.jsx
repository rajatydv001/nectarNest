import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
          <h1 className="font-display text-4xl text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Agreement to Terms</h2>
              <p>By accessing and using the NectorNest website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Use License</h2>
              <p>Permission is granted to temporarily use one copy of the materials (information or software) on NectorNest's website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Products and Orders</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All product descriptions are subject to availability</li>
                <li>We reserve the right to refuse or cancel any order for any reason</li>
                <li>Prices are subject to change without notice</li>
                <li>Product images are for illustration purposes only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Pricing and Payment</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All prices are in Indian Rupees (₹)</li>
                <li>Payment is processed securely through authorized payment gateways</li>
                <li>We charge shipping for orders below ₹500</li>
                <li>Free shipping for orders above ₹500</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Account Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Disclaimer</h2>
              <p>The materials on NectorNest's website are provided "as is." We make no warranties, expressed or implied, and hereby disclaim all warranties, including without limitation implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Limitations</h2>
              <p>In no event shall NectorNest be liable for any damages arising out of the use or inability to use the materials on our website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us at hello@nectarnest.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}