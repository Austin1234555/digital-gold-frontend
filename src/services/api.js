import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";


export const signup = (name, email, password) =>
  axios.post(`${API_BASE}/auth/signup?name=${name}&email=${email}&password=${password}`);

export const login = (email, password) =>
  axios.post(`${API_BASE}/auth/login?email=${email}&password=${password}`);

export const getWallet = (userId) =>
  axios.get(`${API_BASE}/wallet?userId=${userId}`);

export const getLatestPrice = () =>
  axios.get(`${API_BASE}/partner/get-price`);

// ---- RAZORPAY ----
export const createRazorpayOrder = (userId, amount, method) =>
  axios.post(`${API_BASE}/payment/razorpay-order`, {
    userId,
    amount,
    method,
  });

export const confirmRazorpayPayment = (payload) =>
  axios.post(`${API_BASE}/payment/razorpay-confirm`, payload);
