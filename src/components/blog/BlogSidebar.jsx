import React from "react";
import { Link } from "react-router-dom";

const BlogSidebar = ({ blogs }) => {
  if (!blogs || blogs.length === 0) return null;

  return (
    <aside className="detail-sidebar">
      <h3 className="sidebar-title">Related Posts</h3>
      <ul className="sidebar-list">
        {blogs.map((item) => (
          <li key={item.id} className="sidebar-item">
            <Link to={`/blog/${item.id}`} className="sidebar-link">
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.title}
                className="sidebar-thumb"
              />
              <div className="sidebar-info">
                <h4>{item.title}</h4>
                <p>{item.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BlogSidebar;
