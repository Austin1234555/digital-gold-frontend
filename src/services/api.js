import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";

// ---------- AUTH ----------
export const signup = (name, email, password) =>
  axios.post(`${API_BASE}/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  axios.post(`${API_BASE}/auth/login?email=${email}&password=${password}`);

// ---------- USER ----------
export const getWallet = (userId) =>
  axios.get(`${API_BASE}/wallet/${userId}`);

export const getLatestPrice = () =>
  axios.get(`${API_BASE}/price/latest`);

// ---------- PAYMENT ----------
export const createRazorpayOrder = (userId, amount, method) =>
  axios.post(`${API_BASE}/payment/razorpay-order`, {
    userId,
    amount,
    method,
  });

export const confirmRazorpayPayment = (data) =>
  axios.post(`${API_BASE}/payment/razorpay-confirm`, data);
