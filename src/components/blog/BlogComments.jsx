// src/components/blog/BlogComments.jsx
import React from "react";
import FormField from "@components/ui/FormField";
import Button from "@components/ui/Button";
import { useBlogComments } from "@hooks/useBlogComments";

const BlogComments = ({ blogId }) => {
  const {
    comments,
    newComment,
    errors,
    loading,
    submitting,
    handleChange,
    handleSubmit,
  } = useBlogComments(blogId);

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name...",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email...",
    },
    {
      label: "Comment",
      name: "content",
      type: "textarea",
      placeholder: "Write your comment...",
      rows: 4,
    },
  ];

  const formatDate = (dt) => {
    if (!dt) return "Unknown";
    if (dt.toDate) dt = dt.toDate();
    if (typeof dt === "string") dt = new Date(dt);
    if (isNaN(dt.getTime())) return "Unknown";
    return dt.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="blog-comments">
      <h3 className="comment-title">Comments ({comments.length})</h3>

      <form className="comment-form" onSubmit={handleSubmit} noValidate>
        <h4 className="comment-form-title">Leave a Comment</h4>

        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={newComment[field.name] || ""}
            onChange={handleChange}
            required
            error={errors[field.name]}
          />
        ))}

        <Button type="submit" hover disabled={submitting}>
          {submitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <ul className="comment-list">
        {comments.map((cmt) => (
          <li key={cmt.id} className="comment-item">
            <div className="comment-body">
              <h5 className="comment-name">{cmt.name}</h5>
              <span className="comment-date">{formatDate(cmt.datetime)}</span>
              <p className="comment-text">{cmt.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogComments;
