import { config } from './config';

const SHEET_DB_URL = config.SHEET_DB_URL;

export const getProducts = async () => {
  if (SHEET_DB_URL.includes('YOUR_')) {
    return getDemoProducts();
  }
  try {
    const response = await fetch(`${SHEET_DB_URL}/sheet/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Using demo products - Google Sheets not connected yet');
    return getDemoProducts();
  }
};

export const getOrders = async () => {
  if (SHEET_DB_URL.includes('YOUR_')) {
    const saved = localStorage.getItem('nectarnest-orders');
    return saved ? JSON.parse(saved) : [];
  }
  try {
    const response = await fetch(`${SHEET_DB_URL}/sheet/orders`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Using local orders - Google Sheets not connected yet');
    const saved = localStorage.getItem('nectarnest-orders');
    return saved ? JSON.parse(saved) : [];
  }
};

export const saveOrder = async (order) => {
  const orderWithDate = {
    ...order,
    order_id: `NN-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  };

  if (!SHEET_DB_URL.includes('YOUR_')) {
    try {
      await fetch(`${SHEET_DB_URL}/sheet/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderWithDate)
      });
    } catch (error) {
      const orders = await getOrders();
      orders.push(orderWithDate);
      localStorage.setItem('nectarnest-orders', JSON.stringify(orders));
    }
  } else {
    const orders = await getOrders();
    orders.push(orderWithDate);
    localStorage.setItem('nectarnest-orders', JSON.stringify(orders));
  }

  return orderWithDate;
};

export const updateOrderStatus = async (orderId, status) => {
  if (!SHEET_DB_URL.includes('YOUR_')) {
    try {
      await fetch(`${SHEET_DB_URL}/sheet/orders/order_id/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (error) {
      const orders = await getOrders();
      const updated = orders.map(o => 
        o.order_id === orderId ? { ...o, status } : o
      );
      localStorage.setItem('nectarnest-orders', JSON.stringify(updated));
    }
  } else {
    const orders = await getOrders();
    const updated = orders.map(o => 
      o.order_id === orderId ? { ...o, status } : o
    );
    localStorage.setItem('nectarnest-orders', JSON.stringify(updated));
  }
};

function getDemoProducts() {
  return [
    {
      id: 'wildflower',
      name: 'Wildflower Honey',
      description: 'Collected from diverse wildflowers, this honey offers a complex, rich flavor with hints of herbs and flowers. Raw and unprocessed.',
      price_500g: 350,
      price_1kg: 650,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
      in_stock: true,
      category: 'Premium'
    },
    {
      id: 'acacia',
      name: 'Acacia Honey',
      description: 'Light, delicate, and sweet with a subtle floral aroma. Sourced from Acacia blossoms, known for its clarity and mild taste.',
      price_500g: 450,
      price_1kg: 850,
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
      in_stock: true,
      category: 'Premium'
    },
    {
      id: 'linden',
      name: 'Linden Honey',
      description: 'A soothing honey with calming properties. Harvested from linden tree blossoms, featuring a fresh, menthol-like aroma.',
      price_500g: 400,
      price_1kg: 750,
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
      in_stock: true,
      category: 'Organic'
    },
    {
      id: 'multiflower',
      name: 'Multi-Flower Honey',
      description: 'A beautiful blend of nectar from multiple flower sources. Rich in enzymes and nutrients, perfect for everyday use.',
      price_500g: 299,
      price_1kg: 550,
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
      in_stock: true,
      category: 'Organic'
    }
  ];
}