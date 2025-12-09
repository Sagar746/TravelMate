import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach auth token from localStorage when available
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore localStorage access errors (e.g., server-side rendering)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error.response?.data || error.message);

    // If unauthorized, clear token and redirect to login so user can re-authenticate
    try {
      if (error.response && error.response.status === 401) {
        try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch (e) {}
        // Small delay to ensure any UI state updates complete
        setTimeout(() => { window.location.href = '/login'; }, 100);
      }
    } catch (e) {
      // ignore redirect errors
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
