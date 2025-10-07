import { useState, useEffect } from "react";
import { getCommentsByBlogId, postComment } from "@api/commentApi";
import { toast } from "react-toastify";

export const useBlogComments = (blogId) => {
  const initialComment = { name: "", email: "", content: "" };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(initialComment);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Format datetime kiểu "YYYY-MM-DD HH:mm:ss"
  const getCurrentDateTime = () => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}`;
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds()
    )}`;
    return `${date} ${time}`;
  };

  // Lấy comment
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getCommentsByBlogId(blogId);
        setComments(data);
      } catch (err) {
        console.error("Lỗi khi tải comment:", err);
        toast.error("Không thể tải comment");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate
  const validate = () => {
    const newErrors = {};
    if (!newComment.name.trim()) newErrors.name = "Name is required.";
    if (!newComment.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(newComment.email))
      newErrors.email = "Email is invalid.";
    if (!newComment.content.trim()) newErrors.content = "Comment is required.";
    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    const payload = {
      ...newComment,
      blogId: parseInt(blogId),
      datetime: getCurrentDateTime(), // chuẩn datetime
    };

    setLoading(true);
    try {
      const savedComment = await postComment(payload);
      setComments((prev) => [savedComment, ...prev]);
      toast.success("Comment posted successfully!");
      setNewComment(initialComment);
      setErrors({});
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    newComment,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
