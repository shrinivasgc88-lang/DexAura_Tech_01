import axios from 'axios';

// Main backend URL (Python FastAPI)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Node.js Contact Server URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// API instance for main backend
const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API instance for Node.js contact server
const contactApi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api, contactApi };
export default api;

