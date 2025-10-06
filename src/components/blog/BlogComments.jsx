import React, { useState } from "react";
import FormField from "@components/ui/FormField";
import Button from "@components/ui/Button";

const BlogComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "Oct 6, 2025",
      content: "Great article! Very informative and well-written.",
    },
    {
      id: 2,
      name: "Sarah Smith",
      date: "Oct 6, 2025",
      content: "I love the part about the recipe ideas 🍷",
    },
  ]);

  const [newComment, setNewComment] = useState({ name: "", content: "" });
  const [error, setError] = useState({ name: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newError = { name: "", content: "" };

    if (!newComment.name.trim()) {
      newError.name = "Please enter your name.";
      isValid = false;
    }
    if (!newComment.content.trim()) {
      newError.content = "Please enter a comment.";
      isValid = false;
    }

    setError(newError);
    if (!isValid) return;

    const newItem = {
      id: Date.now(),
      name: newComment.name,
      content: newComment.content,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setComments([newItem, ...comments]);
    setNewComment({ name: "", content: "" });
  };

  return (
    <div className="blog-comments">
      <h3 className="comment-title">Comments ({comments.length})</h3>

      {/* Comment list */}
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

      {/* Comment form */}
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
          error={error.name}
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
          error={error.email}
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
          error={error.content}
        />

        <Button type="submit" hover>
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default BlogComments;
