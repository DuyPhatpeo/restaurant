import React, { useState, useEffect } from "react";
import MenuTabs from "./MenuTabs";
import MenuList from "./MenuList";
import { getCategories, getFoodsByCategory } from "@api/foodApi";

const Menu = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 768 : true
  );
  const [activeTab, setActiveTab] = useState(""); // categoryId đang chọn
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // Resize để check desktop/mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lấy categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
        if (data && data.length > 0) {
          setActiveTab(data[0].id.toString()); // mặc định chọn tab đầu
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Lấy foods theo category
  useEffect(() => {
    if (!activeTab) return;
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const data = await getFoodsByCategory(activeTab);
        setFoods(data || []);
      } catch (error) {
        console.error("Error fetching foods:", error);
        setFoods([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [activeTab]);

  return (
    <section className="menu-list-wrapper">
      {/* Tabs */}
      <MenuTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* List */}
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : foods.length > 0 ? (
        <MenuList items={foods} isDesktop={isDesktop} />
      ) : (
        <p className="empty-text">No products found</p>
      )}
    </section>
  );
};

export default Menu;
