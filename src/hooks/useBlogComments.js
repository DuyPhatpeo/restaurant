import { useState, useEffect } from "react";
import { getCommentsByBlogId, postComment } from "@api/commentApi";

export const useBlogComments = (blogId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy comment theo blogId
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getCommentsByBlogId(blogId);
        setComments(data);
      } catch (err) {
        console.error("Lỗi khi tải comment:", err);
        setError("Không thể tải comment");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  // Thêm comment mới
  const addComment = async (commentData) => {
    try {
      const savedComment = await postComment({
        ...commentData,
        blogId: parseInt(blogId),
      });
      setComments((prev) => [savedComment, ...prev]);
      return savedComment;
    } catch (err) {
      console.error("Lỗi khi đăng comment:", err);
      throw err;
    }
  };

  return { comments, loading, error, addComment };
};
