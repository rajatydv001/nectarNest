import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
          <h1 className="font-display text-4xl text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Introduction</h2>
              <p>NectorNest ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Personal information (name, email, phone number, address)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To process and deliver your orders</li>
                <li>To communicate with you about your orders</li>
                <li>To provide customer support</li>
                <li>To improve our services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except trusted third parties who assist us in operating our website, conducting our business, or serving you, so long as those parties agree to keep this information confidential.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. Contact us at hello@nectarnest.com to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at hello@nectarnest.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}