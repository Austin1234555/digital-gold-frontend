import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";

export const signup = (name, email, password) =>
  axios.post(`${API_BASE}/auth/signup`, { name, email, password });

export const login = (email, password) =>
  axios.post(`${API_BASE}/auth/login`, { email, password });

export const getWallet = (userId) =>
  axios.get(`${API_BASE}/wallet/${userId}`);

export const getLatestPrice = () =>
  axios.get(`${API_BASE}/price/latest`);

export const createRazorpayOrder = (userId, amount, method) =>
  axios.post(`${API_BASE}/razorpay/create-order`, { userId, amount, method });

export const confirmRazorpayPayment = (data) =>
  axios.post(`${API_BASE}/razorpay/confirm-payment`, data);
