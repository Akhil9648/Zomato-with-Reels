import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://zomato-with-reels.onrender.com'
);

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default API;
