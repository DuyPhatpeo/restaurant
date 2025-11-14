// src/hooks/useBlogComments.js
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

  const namePattern = /^[\p{L}\s'-]+$/u;
  const emailPattern = /\S+@\S+\.\S+/;

  const validate = () => {
    const newErrors = {};
    if (!newComment.name.trim()) newErrors.name = "Name is required.";
    else if (!namePattern.test(newComment.name))
      newErrors.name = "Invalid name.";
    if (!newComment.email.trim()) newErrors.email = "Email is required.";
    else if (!emailPattern.test(newComment.email))
      newErrors.email = "Invalid email.";
    if (!newComment.content.trim())
      newErrors.content = "Comment cannot be empty.";
    return newErrors;
  };

  // Load comments
  useEffect(() => {
    if (!blogId) return;
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getCommentsByBlogId(blogId);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load comments.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [blogId]);

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
      toast.error("Please fix errors.");
      return;
    }

    const payload = { ...newComment, blogId: blogId.toString() };
    setSubmitting(true);
    try {
      const saved = await postComment(payload);
      if (saved.datetime?.toDate) saved.datetime = saved.datetime.toDate();
      setComments((prev) => [saved, ...prev]);
      setNewComment(initialComment);
      toast.success("Comment posted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment.");
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
