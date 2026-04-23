import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../utils/sheets';
import { sendOrderEmails } from '../utils/email';

export default function Checkout() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      items: state.items,
      total: state.total,
      payment_notes: formData.paymentNotes
    };

    try {
      const savedOrder = await saveOrder(order);
      await sendOrderEmails(savedOrder, formData.email);
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-success', { state: { order: savedOrder } });
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-display text-3xl text-earth mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-earth mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-earth mb-1">Address</label>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                placeholder="123 Main Street, Apt 4"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                  placeholder="400001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-earth mb-1">Payment Notes (Optional)</label>
              <textarea
                name="paymentNotes"
                value={formData.paymentNotes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 bg-white border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500"
                placeholder="Any special payment instructions..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-honey-500 text-white font-semibold rounded-xl hover:bg-honey-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Place Order - ₹${state.total}`}
            </button>
          </form>

          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h3 className="font-semibold text-earth mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-earth/80">{item.name} ({item.size}) x {item.quantity}</span>
                  <span className="text-earth">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-honey-200 pt-4">
              <div className="flex justify-between font-semibold text-earth">
                <span>Total</span>
                <span className="text-honey-600">₹{state.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}