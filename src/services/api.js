import axios from "axios";

const API_BASE_URL = "https://digital-gold-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Authentication
export const registerAPI = (data) => api.post("/auth/register", data);
export const loginAPI = (data) => api.post("/auth/login", data);

// User Profile
export const getProfileAPI = () => api.get("/user/profile");

// Wallet (OLD name used in project)
export const getWallet = () => api.get("/wallet");

// Wallet (NEW name used in some components)
export const getWalletAPI = () => api.get("/wallet");

// Gold Operations
export const buyGoldAPI = (data) => api.post("/gold/buy", data);

// Transactions
export const getTransactionsAPI = () => api.get("/transactions/all");

export default api;
