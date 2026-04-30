import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProducts } from '../utils/sheets';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    const loadData = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
      
      const allProducts = await getProducts();
      const related = allProducts.filter(p => p.category === productData?.category && p.id !== id).slice(0, 4);
      setRelatedProducts(related);
      
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen pt-24 text-center">Product not found</div>;
  }

  const isLollipop = product.id === 'ginger-lollipop';
  
  const price1unit = product.price_500g;
  const price5units = product.price_5units || 50;
  const price12units = product.price_1kg || 110;

  const getPrice = (size) => {
    if (isLollipop) {
      switch(size) {
        case '1 unit': return price1unit;
        case '5 units': return price5units;
        case '12 units': return price12units;
        default: return price1unit;
      }
    }
    const price250g = Math.round(product.price_500g * 0.55);
    const price500g = product.price_500g;
    const price750g = Math.round(product.price_500g * 1.4);
    const price1kg = product.price_1kg;
    switch(size) {
      case '250g': return price250g;
      case '500g': return price500g;
      case '750g': return price750g;
      case '1kg': return price1kg;
      default: return price500g;
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        selectedSize,
        quantity,
        price: getPrice(selectedSize)
      }
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="text-amber-600 hover:underline inline-flex items-center gap-2 mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[40%] blur-2xl opacity-20"></div>
            {console.log('Product image:', product.id, product.image)}
            <img
              src={product.id === 'ginger-lollipop' ? 'photo2.png' : (product.image || 'photo1.jpg')}
              alt={product.name}
              className="relative rounded-[30%] shadow-2xl w-full"
            />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full mb-4">
              {product.category}
            </span>
            <h1 className="font-display text-4xl text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-500 text-sm ml-2">(5.0) - 128 reviews</span>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.fullDescription || product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-amber-50 rounded-xl p-4">
                <span className="text-xs text-gray-500 uppercase">Origin</span>
                <p className="font-semibold text-gray-900">{product.origin}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <span className="text-xs text-gray-500 uppercase">Color</span>
                <p className="font-semibold text-gray-900">{product.color}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <span className="text-xs text-gray-500 uppercase">Taste</span>
                <p className="font-semibold text-gray-900">{product.taste}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <span className="text-xs text-gray-500 uppercase">Harvest Season</span>
                <p className="font-semibold text-gray-900">{product.harvestSeason}</p>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">{isLollipop ? 'Select Pack' : 'Select Size'}</label>
              <div className="grid grid-cols-4 gap-2">
                {isLollipop ? (
                  <>
                    <button
                      onClick={() => setSelectedSize('1 unit')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '1 unit'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">1 unit</span>
                      <span className="text-base">₹{price1unit}</span>
                    </button>
                    <button
                      onClick={() => setSelectedSize('5 units')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '5 units'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">5 units</span>
                      <span className="text-base">₹{price5units}</span>
                    </button>
                    <button
                      onClick={() => setSelectedSize('12 units')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '12 units'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">12 units</span>
                      <span className="text-base">₹{price12units}</span>
                    </button>
                    <button
                      onClick={() => setSelectedSize('12 units')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '12 units'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      disabled
                      style={{ opacity: 0.5 }}
                    >
                      <span className="block text-xs opacity-70">36 units</span>
                      <span className="text-base">₹320</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedSize('250g')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '250g'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">250g</span>
                      <span className="text-base">₹{Math.round(product.price_500g * 0.55)}</span>
                    </button>
                    <button
                      onClick={() => setSelectedSize('500g')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '500g'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">500g</span>
                      <span className="text-base">₹{product.price_500g}</span>
                    </button>
                    <button
                      onClick={() => setSelectedSize('750g')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '750g'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">750g</span>
                      <span className="text-base">₹{Math.round(product.price_500g * 1.4)}</span>
                    </button>
                    <button
                      onClick={() => setSelectedSize('1kg')}
                      className={`py-3 px-2 rounded-xl font-semibold transition-all duration-300 ${
                        selectedSize === '1kg'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="block text-xs opacity-70">1kg</span>
                      <span className="text-base">₹{product.price_1kg}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center bg-gray-100 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-6 font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-4 px-8 rounded-xl font-semibold transition-all duration-300 ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02]'
                }`}
              >
                {isAdding ? 'Added!' : 'Add to Cart'}
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Shelf Life</span>
                  <span className="font-semibold text-gray-900">{product.shelfLife}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Origin</span>
                  <span className="font-semibold text-gray-900">{product.origin}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Harvest Season</span>
                  <span className="font-semibold text-gray-900">{product.harvestSeason}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-500">Best Paired With</span>
                  <span className="font-semibold text-gray-900">{product.pairing}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-display text-2xl text-gray-900 mb-6">Customer Reviews</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-amber-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">Priya Sharma</span>
              </div>
              <p className="text-gray-600 text-sm">Absolutely love this honey! The flavor is authentic and natural. Been ordering for my family.</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">Amit Patel</span>
              </div>
              <p className="text-gray-600 text-sm">Great quality honey. Fast delivery and proper packaging. Highly recommended!</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-gray-900">Riya Mehta</span>
              </div>
              <p className="text-gray-600 text-sm">Perfect for daily use. My kids love it with milk and tea. Will order again!</p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl text-gray-900 mb-6">Similar Honey Varieties</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <Link 
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{p.name}</h4>
                    <div className="flex justify-between">
                      <span className="text-amber-600 font-semibold">₹{p.price_500g}</span>
                      <span className="text-gray-500 text-sm">500g</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}