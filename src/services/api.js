// src/services/api.js
import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// ---------------- AUTH ----------------
export const signup = (name, email, password) =>
  api.post(`/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  api.post(`/auth/login?email=${email}&password=${password}`);

export const getProfile = () =>
  api.get("/user/profile");

// ---------------- GOLD ----------------
export const buyGold = (amount) =>
  api.post(`/gold/buy?amount=${amount}`);

export const getTransactions = () =>
  api.get("/transactions/all");

// (OPTIONAL) If wallet endpoint is added later
// export const getWallet = () => api.get("/wallet");

export default api;
