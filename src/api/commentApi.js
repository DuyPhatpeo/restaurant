import api from "@lib/axios";

/**
 * Lấy danh sách comment theo blogId
 * @param {string|number} blogId
 */
export const getCommentsByBlogId = async (blogId) => {
  if (!blogId) throw new Error("Blog ID is required");

  try {
    const res = await api.get(`/comments`, {
      params: { blogId }, // query params để lọc comment theo blog
    });
    // sắp xếp comment mới nhất lên đầu
    return res.data.sort((a, b) => b.id - a.id);
  } catch (error) {
    console.error(`Lỗi khi lấy comment của blogId=${blogId}:`, error);
    throw error;
  }
};

/**
 * Thêm comment mới cho blog
 * @param {Object} commentData - { blogId, name, email, content }
 */
export const postComment = async (commentData) => {
  if (!commentData.blogId || !commentData.name || !commentData.content) {
    throw new Error("blogId, name và content là bắt buộc");
  }

  try {
    const res = await api.post("/comments", commentData);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng comment:", error);
    throw error;
  }
};
