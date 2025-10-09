import { useState, useEffect } from "react";
import { getCommentsByBlogId, postComment } from "@api/commentApi";
import { toast } from "react-toastify";

export const useBlogComments = (blogId) => {
  const initialComment = { name: "", email: "", content: "" };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(initialComment);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ========= REGEX CONSTANTS =========
  const namePattern = /^[\p{L}\s'-]+$/u;
  const emailPattern = /\S+@\S+\.\S+/;

  // ========= HELPERS =========
  const getCurrentDateTime = () => {
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds()
    )}`;
  };

  const validate = () => {
    const newErrors = {};

    if (!newComment.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!namePattern.test(newComment.name)) {
      newErrors.name =
        "Name can only contain letters and spaces (no special characters).";
    }

    if (!newComment.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(newComment.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!newComment.content.trim()) {
      newErrors.content = "Comment cannot be empty.";
    }

    return newErrors;
  };

  // ========= FETCH COMMENTS =========
  useEffect(() => {
    if (!blogId) return;
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getCommentsByBlogId(blogId);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading comments:", err);
        toast.error("Unable to load comments.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [blogId]);

  // ========= HANDLERS =========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    const payload = {
      ...newComment,
      blogId: parseInt(blogId),
      datetime: getCurrentDateTime(),
    };

    setSubmitting(true);
    try {
      const savedComment = await postComment(payload);
      setComments((prev) => [savedComment, ...prev]);
      setNewComment(initialComment);
      toast.success("Comment posted successfully!");
    } catch (err) {
      console.error("Error submitting comment:", err);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    comments,
    newComment,
    errors,
    loading,
    submitting,
    handleChange,
    handleSubmit,
  };
};
