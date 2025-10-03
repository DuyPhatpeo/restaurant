// api/personApi.js
import api from "@lib/axios";

// Lấy tất cả persons
export const getChefs = async () => {
  const res = await api.get("/chefs");
  return res.data;
};
