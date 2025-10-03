// api/personApi.js
import api from "@lib/axios";

// Lấy tất cả persons
export const getPersons = async () => {
  const res = await api.get("/chefs");
  return res.data; // [{id, name, role, image, social}, ...]
};
