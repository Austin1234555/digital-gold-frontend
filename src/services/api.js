import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const signup = (name, email, password) =>
  api.post(`/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  api.post(`/auth/login?email=${email}&password=${password}`);

export const getProfile = () => api.get(`/user/profile`);
export const getWallet = () => api.get(`/wallet`); // keeps build safe
export const buyGold = (amount) => api.post(`/gold/buy`, { amount });
export const getTransactions = () => api.get(`/transactions/all`);

export default api;
