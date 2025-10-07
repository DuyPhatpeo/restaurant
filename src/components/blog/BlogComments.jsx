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

    const errors = {
      name: !newComment.name.trim() ? "Please enter your name." : "",
      email: !newComment.email.trim() ? "Please enter your email." : "",
      content: !newComment.content.trim() ? "Please enter a comment." : "",
    };

    setFormError(errors);

    if (Object.values(errors).some(Boolean)) return;

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
      console.error("Error submitting comment:", err);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="blog-comments">
      <h3 className="comment-title">Comments ({comments.length})</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <h4 className="comment-form-title">Leave a Comment</h4>
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

      <ul className="comment-list">
        {comments.map((cmt) => (
          <li key={cmt.id} className="comment-item">
            <div className="comment-body">
              <h5 className="comment-name">{cmt.name}</h5>
              <span className="comment-date">{cmt.date}</span>
              <p className="comment-text">{cmt.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogComments;
