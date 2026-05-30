import axios from 'axios';

// Uses VITE_API_URL env var in production (set in Vercel dashboard)
// Falls back to localhost for local development
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchProducts = (category = 'all') =>
  api.get(`/products${category !== 'all' ? `?category=${category}` : ''}`);

export const syncCart = (items) =>
  api.post('/cart', { items });

export const placeOrder = (items, total) =>
  api.post('/order', { items, total });

export default api;
