import api from "@lib/axios";

/**
 * Lấy danh sách comment theo blogId (mới nhất lên đầu)
 */
export const getCommentsByBlogId = async (blogId) => {
  if (!blogId) throw new Error("Blog ID is required");

  try {
    const res = await api.get("/comments", {
      params: { blogId },
    });

    // Sort theo datetime (chuỗi có định dạng "YYYY-MM-DD HH:mm:ss")
    return res.data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  } catch (error) {
    console.error(`Lỗi khi lấy comment của blogId=${blogId}:`, error);
    throw error;
  }
};

/**
 * Thêm comment mới cho blog
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
