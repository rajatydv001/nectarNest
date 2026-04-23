import emailjs from '@emailjs/browser';
import { config } from './config';

export const sendOrderEmails = async (order, customerEmail) => {
  const orderDetails = order.items.map(item => 
    `${item.name} (${item.size}) x ${item.quantity} = ₹${item.price * item.quantity}`
  ).join('\n');

  const customerTemplateParams = {
    to_name: order.customer_name,
    to_email: customerEmail,
    order_id: order.order_id,
    order_date: order.date,
    items: orderDetails,
    total: order.total,
    address: order.address,
    phone: order.phone
  };

  const ownerTemplateParams = {
    to_name: 'NectorNest Owner',
    to_email: config.OWNER_EMAIL,
    order_id: order.order_id,
    customer_name: order.customer_name,
    customer_email: customerEmail,
    phone: order.phone,
    address: order.address,
    items: orderDetails,
    total: order.total,
    order_date: order.date
  };

  if (config.EMAILJS_PUBLIC_KEY.includes('YOUR_')) {
    console.warn('EmailJS not configured - would send to:', customerEmail);
    console.log('Owner would be notified at:', config.OWNER_EMAIL);
    return false;
  }

  try {
    await emailjs.send(config.EMAILJS_SERVICE_ID, config.EMAILJS_TEMPLATE_ID, customerTemplateParams, config.EMAILJS_PUBLIC_KEY);
    await emailjs.send(config.EMAILJS_SERVICE_ID, config.EMAILJS_TEMPLATE_ID, ownerTemplateParams, config.EMAILJS_PUBLIC_KEY);
    return true;
  } catch (error) {
    console.warn('Email sending failed:', error);
    return false;
  }
};