import axios from 'axios';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return 'http://localhost:5000/api';
  return envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' }
});

export const fetchProducts = (category = 'all') =>
  api.get(`/products${category !== 'all' ? `?category=${category}` : ''}`);

export const syncCart = (items) =>
  api.post('/cart', { items });

export const placeOrder = (items, total) =>
  api.post('/order', { items, total });

export default api;
