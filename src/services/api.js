import axios from "axios";

// Backend
const API_BASE = "https://digital-gold-backend.onrender.com";

// Common axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// ---- AUTH ----
export const signup = (name, email, password) =>
  api.post(`/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  api.post(`/auth/login?email=${email}&password=${password}`);

// ---- WALLET ----
export const getWallet = (userId) =>
  api.get(`/wallet?userId=${userId}`);

// ---- LIVE PRICE ----
export const getLatestPrice = () =>
  api.get(`/price/latest`);

// ---- RAZORPAY ----
export const createRazorpayOrder = (userId, amount, method) =>
  api.post(`/razorpay/create-order`, { userId, amount, method });

export const confirmRazorpayPayment = (data) =>
  api.post(`/razorpay/confirm-payment`, data);

export default api;
