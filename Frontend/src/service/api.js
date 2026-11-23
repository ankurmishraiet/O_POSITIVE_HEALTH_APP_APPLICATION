import axios from "axios";
import { BASE_URL } from "../config/api";

// Phone par bhi chale, isliye localhost ki jagah BASE_URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default api;