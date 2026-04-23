import { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../utils/sheets';
import { config } from '../utils/config';

const ADMIN_PASSWORD = config.ADMIN_PASSWORD;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (parseInt(o.total) || 0), 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-6 honey-gradient rounded-full flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <h2 className="font-display text-2xl text-earth text-center mb-6">Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-honey-200 rounded-xl focus:outline-none focus:border-honey-500 mb-4"
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-honey-500 text-white font-semibold rounded-xl hover:bg-honey-600 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-earth">Orders Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-earth/70 hover:text-honey-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-sm text-earth/60 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-honey-600">{orders.length}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-sm text-earth/60 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-honey-600">₹{totalRevenue}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-sm text-earth/60 mb-1">Pending Orders</div>
            <div className="text-3xl font-bold text-honey-600">
              {orders.filter(o => o.status === 'Pending').length}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-honey-200 border-t-honey-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-earth/60">No orders yet</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-honey-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-earth">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-honey-100">
                  {orders.map((order) => (
                    <tr key={order.order_id} className="hover:bg-honey-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-honey-600">{order.order_id}</div>
                        <div className="text-xs text-earth/60">{order.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-earth">{order.customer_name}</div>
                        <div className="text-sm text-earth/60">{order.address}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-earth">{order.email}</div>
                        <div className="text-sm text-earth/60">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-earth/80 max-w-xs">
                        {typeof order.items === 'string' 
                          ? order.items 
                          : JSON.stringify(order.items)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-earth">₹{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status || 'Pending'}
                          onChange={(e) => handleStatusUpdate(order.order_id, e.target.value)}
                          className="text-sm border border-honey-200 rounded-lg px-2 py-1 focus:outline-none focus:border-honey-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}