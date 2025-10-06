import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FormField from "@components/ui/FormField";
import Button from "@components/ui/Button";
import { useBlogComments } from "@hooks/useBlogComments";

const BlogComments = () => {
  const { id: blogId } = useParams();
  const { comments, loading, error, addComment } = useBlogComments(blogId);

  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newError = { name: "", email: "", content: "" };

    if (!newComment.name.trim()) {
      newError.name = "Please enter your name.";
      isValid = false;
    }
    if (!newComment.email.trim()) {
      newError.email = "Please enter your email.";
      isValid = false;
    }
    if (!newComment.content.trim()) {
      newError.content = "Please enter a comment.";
      isValid = false;
    }

    setFormError(newError);
    if (!isValid) return;

    const payload = {
      ...newComment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    try {
      await addComment(payload);
      setNewComment({ name: "", email: "", content: "" });
    } catch (err) {
      console.error("Lỗi khi gửi comment:", err);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-comments">
      <h3 className="comment-title">Comments ({comments.length})</h3>

      <ul className="comment-list">
        {comments.map((cmt) => (
          <li key={cmt.id} className="comment-item">
            <div className="comment-body">
              <h4 className="comment-name">{cmt.name}</h4>
              <span className="comment-date">{cmt.date}</span>
              <p className="comment-text">{cmt.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="comment-form" onSubmit={handleSubmit}>
        <h4>Leave a Comment</h4>

        <FormField
          label="Name"
          name="name"
          placeholder="Enter your name..."
          value={newComment.name}
          onChange={(e) =>
            setNewComment({ ...newComment, name: e.target.value })
          }
          required
          error={formError.name}
        />
        <FormField
          label="Email"
          name="email"
          placeholder="Enter your email..."
          value={newComment.email}
          onChange={(e) =>
            setNewComment({ ...newComment, email: e.target.value })
          }
          required
          error={formError.email}
        />
        <FormField
          label="Comment"
          type="textarea"
          name="content"
          placeholder="Write your comment..."
          rows={4}
          value={newComment.content}
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
          required
          error={formError.content}
        />

        <Button type="submit" hover>
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default BlogComments;
