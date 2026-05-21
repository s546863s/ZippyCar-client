import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Your backend URL
  withCredentials: true, // Crucial for reading HTTP-Only cookies on client-side requests
});

// CRUCIAL NEXT.JS FIX: Request Interceptor
// If cookies fail due to SSR or cross-origin restrictions on localhost, 
// this interceptor automatically grabs the fallback token from localStorage and injects it.
API.interceptors.request.use(
  (config) => {
    // Check if running on the client side (browser environment)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('zippy_token');
      if (token) {
        // Injects the token into the Authorization header as a bulletproof backup
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;