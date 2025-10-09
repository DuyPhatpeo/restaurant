import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCategories } from "@api/foodApi";
import { getBlogs } from "@api/blogApi";

const BlogSidebar = ({ currentBlogId }) => {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const [catData, blogData] = await Promise.all([
          getCategories(),
          getBlogs(),
        ]);

        setCategories(catData || []);

        // ✅ Loại bỏ bài viết đang xem
        const filtered = (blogData || []).filter(
          (b) => String(b.id) !== String(currentBlogId)
        );

        setBlogs(filtered.slice(0, 4)); // chỉ lấy 4 bài gợi ý
      } catch (error) {
        console.error("Failed to load sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, [currentBlogId]);

  if (loading) return <p className="sidebar-loading">Loading sidebar...</p>;

  return (
    <aside className="detail-sidebar">
      {/* ==== DANH MỤC MÓN ĂN ==== */}
      {categories.length > 0 && (
        <div className="sidebar-category">
          <h3 className="sidebar-title">Categories</h3>
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat.id} className="category-item">
                <Link
                  to={`/menu?category=${cat.id}`}
                  className={`category-link ${
                    location.search.includes(`category=${cat.id}`)
                      ? "active"
                      : ""
                  }`}
                >
                  <span className="category-name">{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ==== GỢI Ý BÀI VIẾT ==== */}
      {blogs.length > 0 && (
        <div className="sidebar-related">
          <h3 className="sidebar-title">Suggestions for you</h3>
          <ul className="sidebar-list">
            {blogs.map((item) => (
              <li key={item.id} className="sidebar-item">
                <Link to={`/blog/${item.id}`} className="sidebar-link">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    className="sidebar-thumb"
                    loading="lazy"
                  />
                  <div className="sidebar-info">
                    <h4>{item.title}</h4>
                    <p>{item.date}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default BlogSidebar;
