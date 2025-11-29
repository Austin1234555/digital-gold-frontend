import axios from "axios";

const API_BASE_URL = "https://digital-gold-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// AUTH
export const registerAPI = (data) => api.post("/auth/register", data);
export const loginAPI = (data) => api.post("/auth/login", data);

// USER PROFILE
export const getProfileAPI = () => api.get("/user/profile");

// BUY GOLD
export const buyGoldAPI = (data) => api.post("/gold/buy", data);

// TRANSACTIONS
export const getTransactionsAPI = () => api.get("/transactions/all");

// 💰 WALLET (New — added because Vercel error was expecting this)
export const getWalletAPI = () => api.get("/wallet");

export default api;
