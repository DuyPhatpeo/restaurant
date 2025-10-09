import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getFoods } from "@api/foodApi";
import { getBlogs } from "@api/blogApi"; // thêm API blog

const FoodSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catData, foodData, blogData] = await Promise.all([
          getCategories(),
          getFoods(),
          getBlogs(), // gọi thêm blog API
        ]);
        setCategories(catData);
        setFoods(foodData);
        setBlogs(blogData.slice(0, 4)); // chỉ lấy 4 bài mới nhất
      } catch (err) {
        console.error("Failed to load sidebar data:", err);
      }
    };

    fetchData();
  }, []);

  // Đếm số lượng food theo categoryId
  const foodCounts = foods.reduce((acc, food) => {
    const catId = food.categoryId || "uncategorized";
    acc[catId] = (acc[catId] || 0) + 1;
    return acc;
  }, {});

  return (
    <aside className="detail-sidebar">
      {/* ==== CATEGORY MENU ==== */}
      <div className="sidebar-category">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} className="category-item">
              <Link to={`/menu?category=${cat.id}`} className="category-link">
                <span className="category-name">{cat.title}</span>
                <span className="category-count">
                  ({foodCounts[cat.id] || 0})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ==== BÀI VIẾT GỢI Ý ==== */}
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
    </aside>
  );
};

export default FoodSidebar;
