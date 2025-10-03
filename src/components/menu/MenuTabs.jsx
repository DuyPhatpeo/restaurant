import React from "react";

const MenuTabs = ({ categories = [], activeTab, onTabChange }) => {
  return (
    <div className="menu-tabs">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`menu-tab ${
            activeTab === cat.id.toString() ? "active" : ""
          }`}
          onClick={() => onTabChange(cat.id.toString())}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
