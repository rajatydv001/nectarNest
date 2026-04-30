export default function OurStory() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm font-medium uppercase tracking-wider">
            About NectorNest
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 mt-4">
            Our Story, Mission & Goals
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Learn why we started NectorNest and our vision for a better tomorrow
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How It All Started</h3>
              <p className="text-gray-500 leading-relaxed">
                Honey has been a part of our family business for years. I wanted to take this business forward and grow it, but at the same time, I also wanted to do something for the environment. 
                Honeybees are extremely important for humans - they play a crucial role in pollination, which is essential for food production. By caring for honeybees, we are also helping preserve their species as bee populations are declining rapidly around the world.
                That's why I started NectorNest - to bring pure honey to people while also contributing to environmental conservation.
              </p>
              <p className="text-gray-500 leading-relaxed mt-4">
                What began as a small initiative has now grown into a trusted name, serving 500+ happy customers across India with 100% authentic honey.
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍💼</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Rajat Yadav</p>
                <p className="text-sm text-gray-500">Founder</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-56 h-56 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-5xl animate-[float_2s_ease-in-out_infinite]">🐝</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Our Mission</h3>
          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-gray-600 leading-relaxed text-center text-lg">
              "To deliver 100% pure, authentic honey to every home in India while making a positive impact on our planet - 
              by planting trees for every order and contributing to ocean cleanup initiatives."
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">100% Authentic</h4>
            <p className="text-gray-500 text-sm">Pure, raw honey - no additives</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Plant Trees</h4>
            <p className="text-gray-500 text-sm">1 tree planted per order</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M3 20h18M5 21h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Clean Oceans</h4>
            <p className="text-gray-500 text-sm">Reduce ocean plastic</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-xl p-6 text-center text-white">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-gray-400 text-sm mt-1">Customers</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-center text-white">
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-gray-400 text-sm mt-1">Trees Planted</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-center text-white">
            <div className="text-2xl font-bold">4.9★</div>
            <div className="text-gray-400 text-sm mt-1">Rating</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 text-center text-white">
            <div className="text-2xl font-bold">50+</div>
            <div className="text-gray-400 text-sm mt-1">KG Plastic Removed</div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose NectorNest</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">100% pure & raw honey</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Direct from beekeepers</p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Free shipping above ₹500</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 text-white">
            <h3 className="text-lg font-semibold mb-4">Our 2027 Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xl font-bold">5,000+ trees</div>
                <div className="text-gray-400 text-sm">to plant</div>
              </div>
              <div>
                <div className="text-xl font-bold">500+ kg plastic</div>
                <div className="text-gray-400 text-sm">to remove from oceans</div>
              </div>
              <div>
                <div className="text-xl font-bold">10,000+ customers</div>
                <div className="text-gray-400 text-sm">happy family target</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}