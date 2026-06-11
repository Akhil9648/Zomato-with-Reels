import axios from 'axios';

let API_BASE_URL = import.meta.env.VITE_API_URL || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://zomato-with-reels.onrender.com'
);

// Automatically strip trailing /api or /api/ to prevent /api/api path duplication
if (API_BASE_URL.endsWith('/api')) {
  API_BASE_URL = API_BASE_URL.slice(0, -4);
} else if (API_BASE_URL.endsWith('/api/')) {
  API_BASE_URL = API_BASE_URL.slice(0, -5);
}

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default API;
