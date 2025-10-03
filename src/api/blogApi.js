import api from "@lib/axios";

// Lấy tất cả blogs
export const getBlogs = async () => {
  const res = await api.get("/blogs"); // endpoint /blogs
  return res.data;
};
