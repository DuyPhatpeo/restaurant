import React from "react";
import { useParams } from "react-router-dom";
import FormField from "@components/ui/FormField";
import Button from "@components/ui/Button";
import { useBlogComments } from "@hooks/useBlogComments";

const BlogComments = () => {
  const { id: blogId } = useParams();

  // Lấy toàn bộ state và handler từ hook
  const { comments, newComment, errors, loading, handleChange, handleSubmit } =
    useBlogComments(blogId);

  if (loading) return <p>Loading comments...</p>;
  if (!comments) return <p>Failed to load comments.</p>;

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
          onChange={handleChange}
          required
          error={errors.name}
        />

        <FormField
          label="Email"
          name="email"
          placeholder="Enter your email..."
          value={newComment.email}
          onChange={handleChange}
          required
          error={errors.email}
        />

        <FormField
          label="Comment"
          type="textarea"
          name="content"
          placeholder="Write your comment..."
          rows={4}
          value={newComment.content}
          onChange={handleChange}
          required
          error={errors.content}
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
