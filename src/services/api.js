import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
});

// ---------- AUTH ----------
export const signup = (name, email, password) =>
  api.post(`/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  api.post(`/auth/login?email=${email}&password=${password}`);

// ---------- WALLET ----------
export const getWallet = (userId) => api.get(`/wallet/${userId}`);

// ---------- PRICE ----------
export const getLatestPrice = () => api.get(`/price/latest`);

// ---------- RAZORPAY ----------
export const createRazorpayOrder = (userId, amount, method) =>
  api.post(`/razorpay/order`, { userId, amount, method });

export const confirmRazorpayPayment = (payload) =>
  api.post(`/razorpay/verify`, payload);

export default api;
