import axios from "axios";

const API_BASE = "https://digital-gold-backend.onrender.com";


export const signup = (name, email, password) =>
  axios.post(`${API_BASE}/auth/signup?name=${name}&email=${email}&password=${password}`);