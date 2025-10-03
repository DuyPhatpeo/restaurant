// api/foodApi.js
import api from "@lib/axios";

// Lấy tất cả foods
export const getFoods = async () => {
  const res = await api.get("/foods");
  return res.data;
};

// Lấy foods theo categoryId
export const getFoodsByCategory = async (categoryId) => {
  const res = await api.get(`/foods?categoryId=${categoryId}`);
  return res.data;
};

// Lấy 1 food theo id
export const getFoodById = async (id) => {
  const res = await api.get(`/foods/${id}`);
  return res.data;
};

// Lấy tất cả categories
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data; // [{id: 1, name: "Breakfast"}, ...]
};
