import api from "@lib/axios";

/**
 * Lấy danh sách tất cả blog
 */
export const getBlogs = async () => {
  try {
    const res = await api.get("/blogs");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách blogs:", error);
    throw error;
  }
};

/**
 * Lấy chi tiết blog theo ID
 * @param {string|number} id - ID của bài viết
 */
export const getBlogById = async (id) => {
  if (!id) {
    throw new Error("❌ Blog ID is required");
  }

  try {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết blog (id=${id}):`, error);
    throw error;
  }
};
