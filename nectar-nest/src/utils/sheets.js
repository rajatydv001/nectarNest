import { config } from './config';

const SHEET_DB_URL = config.SHEET_DB_URL;

export const getProducts = async () => {
  if (SHEET_DB_URL.includes('YOUR_')) {
    return getDemoProducts();
  }
  try {
    const response = await fetch(SHEET_DB_URL);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return getDemoProducts();
  } catch (error) {
    console.warn('Using demo products - Google Sheets not connected yet');
    return getDemoProducts();
  }
};

export const getProductById = async (id) => {
  const products = await getProducts();
  return products.find(p => p.id === id);
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

const honeyImages = [
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo1.jpg',
  '/photo2.png'
];

function getDemoProducts() {
  return [
    {
      id: 'wildflower',
      name: 'Wildflower Honey',
      description: 'Collected from diverse wildflowers, this honey offers a complex, rich flavor with hints of herbs and flowers. Raw and unprocessed.',
      fullDescription: 'Our Wildflower Honey is a beautiful symphony of nectar collected from over 40 different wildflower species across the Himalayan foothills. Each jar captures the essence of spring meadows, with layers of floral, herbal, and slightly earthy notes that dance on your palate.',
      price_500g: 350,
      price_1kg: 650,
      image: honeyImages[0],
      in_stock: true,
      category: 'Premium',
      origin: 'Himalayan Foothills',
      color: 'Golden Amber',
      taste: 'Complex, floral, herbal',
      harvestSeason: 'March - May',
      benefits: ['Rich in antioxidants', 'Natural energy booster', 'Supports immune system', 'Soothes sore throat'],
      pairing: 'Tea, toast, cheese, baked goods',
      shelfLife: '24 months'
    },
    {
      id: 'acacia',
      name: 'Acacia Honey',
      description: 'Light, delicate, and sweet with a subtle floral aroma. Sourced from Acacia blossoms, known for its clarity and mild taste.',
      fullDescription: 'Harvested from the pristine Acacia forests of Central India, this honey is prized for its exceptional clarity and delicate flavor. The pure white blossoms of the Acacia tree produce a light, buttery honey that never crystallizes, making it perfect for those who prefer a milder sweetness.',
      price_500g: 450,
      price_1kg: 850,
      image: honeyImages[1],
      in_stock: true,
      category: 'Premium',
      origin: 'Central India Forests',
      color: 'Light Golden',
      taste: 'Delicate, buttery, vanilla',
      harvestSeason: 'February - April',
      benefits: ['Low glycemic index', 'Easy to digest', 'Good for cooking', 'Never crystallizes'],
      pairing: 'Smoothies, marinades, glazing',
      shelfLife: '36 months'
    },
    {
      id: 'linden',
      name: 'Linden Honey',
      description: 'A soothing honey with calming properties. Harvested from linden tree blossoms, featuring a fresh, menthol-like aroma.',
      fullDescription: 'Also known as "Lime Honey", this exceptional variety is harvested from the fragrant blossoms of linden trees. Known for its calming and sedative properties, this honey has a distinctive fresh, menthol-like aroma with notes of mint and jasmine.',
      price_500g: 400,
      price_1kg: 750,
      image: honeyImages[2],
      in_stock: true,
      category: 'Organic',
      origin: 'Northern Hills',
      color: 'Light Amber',
      taste: 'Fresh, minty, floral',
      harvestSeason: 'May - June',
      benefits: ['Promotes relaxation', 'Aids sleep', 'Soothes anxiety', 'Respiratory support'],
      pairing: 'Warm milk, herbal tea, bedtime',
      shelfLife: '24 months'
    },
    {
      id: 'multiflower',
      name: 'Multi-Flower Honey',
      description: 'A beautiful blend of nectar from multiple flower sources. Rich in enzymes and nutrients, perfect for everyday use.',
      fullDescription: 'Our Multi-Flower Honey is a perfect daily health companion, collected from diverse floral sources throughout the year. This raw, unprocessed honey retains all its natural enzymes, propolis, and pollen, making it a nutritional powerhouse for the whole family.',
      price_500g: 299,
      price_1kg: 550,
      image: honeyImages[3],
      in_stock: true,
      category: 'Organic',
      origin: 'Rural India',
      color: 'Amber',
      taste: 'Rich, fruity, balanced',
      harvestSeason: 'Year-round',
      benefits: ['High in enzymes', 'Natural immunity', 'Energy booster', 'Good for skin'],
      pairing: 'Daily consumption, cooking, remedies',
      shelfLife: '24 months'
    },
    {
      id: 'eucalyptus',
      name: 'Eucalyptus Honey',
      description: 'Harvested from Eucalyptus trees, this honey has a distinct minty flavor with medicinal properties. Excellent for throat and respiratory health.',
      fullDescription: 'Sourced from the vast Eucalyptus forests of Western Ghats, this honey carries the refreshing essence of Eucalyptus leaves. Its distinct minty-menthol flavor makes it a favorite for respiratory wellness and throat comfort.',
      price_500g: 380,
      price_1kg: 720,
      image: honeyImages[4],
      in_stock: true,
      category: 'Ayurvedic',
      origin: 'Western Ghats',
      color: 'Dark Amber',
      taste: 'Minty, medicinal, menthol',
      harvestSeason: 'October - December',
      benefits: ['Throat relief', 'Respiratory health', 'Antimicrobial', 'Clears sinuses'],
      pairing: 'Warm water, ginger tea, throat remedies',
      shelfLife: '24 months'
    },
    {
      id: 'neem',
      name: 'Neem Honey',
      description: 'A powerful Ayurvedic honey with bitter-sweet taste. Known for its detoxifying and immune-boosting properties. Pure and unprocessed.',
      fullDescription: 'A rare and precious Ayurvedic treasure, Neem Honey is harvested from Neem trees revered in Indian tradition for thousands of years. Its unique bitter-sweet profile may take some getting used to, but its powerful health benefits are unmatched.',
      price_500g: 420,
      price_1kg: 800,
      image: honeyImages[5],
      in_stock: true,
      category: 'Ayurvedic',
      origin: 'Rural Punjab & UP',
      color: 'Dark Brown',
      taste: 'Bitter-sweet, earthy',
      harvestSeason: 'February - March',
      benefits: ['Detoxifying', 'Blood purification', 'Immune booster', 'Diabetes friendly'],
      pairing: 'Warm water, Ayurvedic remedies',
      shelfLife: '24 months'
    },
    {
      id: 'mustard',
      name: 'Mustard Honey',
      description: 'Golden-hued honey from mustard flowers. Rich in antioxidants with a unique pungent-sweet flavor. Great for cooking and direct consumption.',
      fullDescription: 'Harvested during the mustard bloom season in the fertile plains of Punjab and Haryana, this honey boasts a beautiful golden color and a unique pungent-sweet flavor. Rich in antioxidants and minerals, its distinctive taste makes it perfect for both cooking and direct consumption.',
      price_500g: 320,
      price_1kg: 600,
      image: honeyImages[6],
      in_stock: true,
      category: 'Organic',
      origin: 'Punjab Plains',
      color: 'Golden Yellow',
      taste: 'Pungent-sweet, tangy',
      harvestSeason: 'February - March',
      benefits: ['High in antioxidants', 'Heart health', 'Energy rich', 'Good for skin'],
      pairing: 'Parathas, desserts, marinades',
      shelfLife: '24 months'
    },
    {
      id: 'tulsi',
      name: 'Tulsi Honey',
      description: 'Infused with Tulsi leaves, this honey offers a divine herbal aroma. Known for stress relief and immune boosting properties.',
      fullDescription: 'A sacred blend of raw honey infused with Tulsi (Holy Basil) leaves, this honey carries the divine essence of one of India\'s most revered medicinal herbs. Known in Ayurveda as an adaptogen, it helps the body adapt to stress while boosting immunity.',
      price_500g: 450,
      price_1kg: 850,
      image: honeyImages[7],
      in_stock: true,
      category: 'Ayurvedic',
      origin: 'Sacred Groves of India',
      color: 'Amber with Green tint',
      taste: 'Herbal, aromatic, soothing',
      harvestSeason: 'Year-round',
      benefits: ['Stress relief', 'Immune boosting', 'Respiratory health', 'Mental clarity'],
      pairing: 'Morning tea, stress relief drinks',
      shelfLife: '18 months'
    },
    {
      id: 'coffee',
      name: 'Coffee Honey',
      description: 'Harvested from coffee plantations, this honey has a rich, caramel-like flavor with subtle coffee notes. A unique delicacy.',
      fullDescription: 'A rare find for honey connoisseurs! This unique honey is produced by bees that pollinate coffee plantations in the misty hills of Coorg and Chikkamagaluru. The result is a rich, caramel-like honey with subtle coffee notes that coffee lovers absolutely adore.',
      price_500g: 350,
      price_1kg: 650,
      image: honeyImages[8],
      in_stock: true,
      category: 'Premium',
      origin: 'Coorg & Chikkamagaluru',
      color: 'Dark Amber',
      taste: 'Caramel, coffee, rich',
      harvestSeason: 'November - January',
      benefits: ['Antioxidants', 'Natural energy', 'Mood enhancer', 'Prebiotic'],
      pairing: 'Coffee, desserts, pancakes',
      shelfLife: '24 months'
    },
    {
      id: 'ajwain',
      name: 'Ajwain Honey',
      description: 'Sourced from Ajwain flowers, this honey has a distinct thymol flavor. Excellent for digestion and digestive health.',
      fullDescription: 'Harvested from Ajwain (Carom) flowers grown in the semi-arid regions of Gujarat and Rajasthan, this honey carries the distinctive thymol flavor that aids digestion. A traditional remedy for digestive issues, this honey is a must-have in every kitchen.',
      price_500g: 400,
      price_1kg: 750,
      image: honeyImages[9],
      in_stock: true,
      category: 'Ayurvedic',
      origin: 'Gujarat & Rajasthan',
      color: 'Amber',
      taste: 'Thymol, medicinal, pungent',
      harvestSeason: 'October - November',
      benefits: ['Digestive aid', 'Gastric relief', 'Antimicrobial', 'Metabolism boost'],
      pairing: 'After meals, digestive tonic',
      shelfLife: '24 months'
    },
    {
      id: 'ginger-lollipop',
      name: 'Ginger Honey Lollipop',
      description: 'A unique combination of raw honey and natural ginger. Soothes throat, aids digestion, and provides natural energy. Perfect for all ages.',
      fullDescription: 'Our Ginger Honey Lollipop is crafted with the finest raw honey and fresh ginger extract. This unique fusion not only tastes delicious but also offers numerous health benefits. The warming effect of ginger combined with the soothing properties of honey makes it perfect for sore throat, cough, and cold. It also aids digestion and provides a natural energy boost without any sugar crash.',
      price_500g: 199,
      price_1kg: 350,
      image: honeyImages[10],
      in_stock: true,
      category: 'Wellness',
      origin: 'Made in India',
      color: 'Golden Brown',
      taste: 'Sweet, warm, spicy ginger',
      harvestSeason: 'Year-round',
      benefits: ['Soothes sore throat & cough', 'Aids digestion', 'Natural energy booster', 'Anti-inflammatory properties', 'Helps with nausea', 'No artificial sugar'],
      pairing: 'Direct consumption, anytime snacking',
      shelfLife: '12 months'
    }
  ];
}