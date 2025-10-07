import api from "@lib/axios";

/**
 * Lấy danh sách comment theo blogId, sắp xếp mới nhất lên đầu
 * @param {string|number} blogId
 */
export const getCommentsByBlogId = async (blogId) => {
  if (!blogId) throw new Error("Blog ID is required");

  try {
    const res = await api.get("/comments", {
      params: { blogId },
    });

    // Sắp xếp theo ngày, mới nhất lên đầu
    return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
    // Tự động thêm ngày hiện tại theo định dạng tương tự trong DB
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }); // ví dụ: "Oct 7, 2025"

    const res = await api.post("/comments", {
      ...commentData,
      date: currentDate,
    });

    return res.data;
  } catch (error) {
    console.error("Lỗi khi đăng comment:", error);
    throw error;
  }
};
