import React from "react";
import MenuItem from "@components/section/MenuItem";

const MenuList = ({ items, isDesktop }) => {
  if (items.length === 0) {
    return <p className="menu-empty">No products available</p>;
  }

  return (
    <div className="menu-list-grid">
      {items.map((item, index) => (
        <MenuItem
          key={item.id}
          item={item}
          reverse={isDesktop && Math.floor(index / 2) % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default MenuList;
