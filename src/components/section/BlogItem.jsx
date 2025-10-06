import React from "react";
import { MessageSquare } from "lucide-react";

const BlogItem = ({ post }) => {
  return (
    <div className="blog-card">
      {/* Ảnh */}
      {post.image && (
        <img src={post.image} alt={post.title} className="blog-image" />
      )}

      {/* Nội dung */}
      <div className="blog-content">
        <p className="meta">
          {post.date || "No date"} <span>• {post.author || "Admin"}</span>
        </p>

        <h4 className="post-title">{post.title}</h4>

        <div className="blog-footer">
          <a href="#">Read more</a>
          <span className="comments">
            <MessageSquare size={16} /> {post.comments ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
