// lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // đổi theo port JSON Server
});

export default api;
