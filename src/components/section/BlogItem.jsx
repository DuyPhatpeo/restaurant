import React from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const BlogItem = ({ post }) => {
  return (
    <div className="blog-card">
      {/* Ảnh — có thể click */}
      {post.image && (
        <Link to={`/blog/${post.id}`} className="blog-image-wrapper">
          <img src={post.image} alt={post.title} className="blog-image" />
        </Link>
      )}

      {/* Nội dung */}
      <div className="blog-content">
        <p className="meta">
          {post.date || "No date"} <span>• {post.author || "Admin"}</span>
        </p>

        {/* Tiêu đề (có thể click) */}
        <h4 className="post-title">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h4>

        <div className="blog-footer">
          {/* Nút “Read more” */}
          <Link to={`/blog/${post.id}`} className="read-more">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
