import React, { useState, useEffect } from "react";
import SectionHeader from "@components/ui/SectionHeader";
import MenuItem from "@components/section/MenuItem";
import { getFoods } from "@api/foodApi";

const Menu = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gọi API lấy dữ liệu
  useEffect(() => {
    getFoods()
      .then((data) => {
        setMenuItems(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="menu-wrapper">
      <SectionHeader subtitle="Specialties" title="Our Menu" />

      {/* Dùng ternary gọn gàng */}
      {loading ? (
        <p className="loading-text">Loading menu...</p>
      ) : error ? (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      ) : menuItems.length === 0 ? (
        <p className="empty-text">No products available</p>
      ) : (
        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              reverse={isDesktop && Math.floor(index / 2) % 2 !== 0}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Menu;
