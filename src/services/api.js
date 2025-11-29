import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// 🔹 AUTH
export const signup = (name, email, password) =>
  api.post(`/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  api.post(`/auth/login?email=${email}&password=${password}`);

// 🔹 USER
export const getProfile = () => api.get(`/user/profile`);

// 🔹 WALLET (kept to prevent build issues)
export const getWallet = () => api.get(`/wallet`);

// 🔹 GOLD
export const buyGold = (amount) => api.post(`/gold/buy`, { amount });

// 🔹 PRICE (fix for your Vercel build)
export const getLatestPrice = () => api.get(`/price/latest`);

// 🔹 TRANSACTIONS
export const getTransactions = () => api.get(`/transactions/all`);

export default api;
