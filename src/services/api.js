import axios from "axios";

const API_BASE_URL = "https://digital-gold-backend.onrender.com";   // backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // we use Bearer token, not cookies
});

// 🔥 Add token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API routes
export const registerAPI = (data) => api.post("/auth/register", data);

export const loginAPI = (data) => api.post("/auth/login", data);

export const getProfileAPI = () => api.get("/user/profile");

export const buyGoldAPI = (data) => api.post("/gold/buy", data);

export const getTransactionsAPI = () => api.get("/transactions/all");

export default api;
