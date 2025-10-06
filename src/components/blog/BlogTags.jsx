import React from "react";

const BlogTags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="blog-tags">
      {tags.map((tag, index) => (
        <span key={index} className="tag-item">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default BlogTags;
