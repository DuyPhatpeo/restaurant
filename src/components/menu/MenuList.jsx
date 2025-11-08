import React, { useState, useEffect } from "react";
import MenuItem from "@components/section/MenuItem";
import MenuTabs from "./MenuTabs";
import { getCategories } from "@api/categoryApi"; // ✅ tách riêng
import { getFoodsByCategory } from "@api/foodApi"; // ✅ riêng file

const MenuList = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);

  // 📦 Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
        if (data?.length > 0) setActiveTab(data[0].id);
      } catch (error) {
        console.error("❌ Lỗi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🍔 Lấy món ăn theo danh mục
  useEffect(() => {
    if (!activeTab) return;
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const data = await getFoodsByCategory(activeTab);
        setFoods(data);
      } catch (error) {
        console.error("❌ Lỗi tải món ăn:", error);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [activeTab]);

  return (
    <section className="menu-list-wrapper">
      <MenuTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {loading ? (
        <p className="loading-text">Đang tải món ăn...</p>
      ) : foods.length > 0 ? (
        <div className="menu-list-grid">
          {foods.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="empty-text">Không có sản phẩm nào.</p>
      )}
    </section>
  );
};

export default MenuList;
