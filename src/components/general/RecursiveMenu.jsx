import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const RecursiveMenu = ({
  items = [],
  location,
  goTo,
  level = 0,
  isMobile = false,
  openSubmenu = [],
  setOpenSubmenu,
  parentKey = "",
}) => {
  if (!Array.isArray(items)) return null;

  return (
    <div
      className={`${
        isMobile ? "navmenu-mobile-level" : "navmenu-level"
      } level-${level}`}
    >
      {items.map((item, idx) => {
        const key = `${parentKey}${idx}`;
        const hasSubmenu = Array.isArray(item.submenu);
        const isOpen = openSubmenu.includes(key);
        const isActive = location?.pathname === item.link;

        const handleClick = (e) => {
          e.stopPropagation();
          if (hasSubmenu && isMobile) {
            setOpenSubmenu((prev) =>
              isOpen ? prev.filter((k) => k !== key) : [...prev, key]
            );
          } else if (item.link) {
            goTo(item.link);
            if (isMobile) setOpenSubmenu([]); // Đóng tất cả submenu khi điều hướng
          }
        };

        return (
          <div key={key} className={`navmenu-item level-${level}`}>
            {isMobile ? (
              <div className="navmenu-mobile-header" onClick={handleClick}>
                <span className={isActive ? "active" : ""}>{item.label}</span>
                {hasSubmenu && (
                  <ChevronDown
                    size={16}
                    className={`navmenu-chevron ${isOpen ? "open" : ""}`}
                  />
                )}
              </div>
            ) : (
              <Link
                to={item.link || "#"}
                className={`navmenu-link ${isActive ? "active" : ""}`}
                onClick={hasSubmenu ? undefined : handleClick}
              >
                {item.label}
                {hasSubmenu && (
                  <ChevronDown size={14} className="navmenu-subicon" />
                )}
              </Link>
            )}

            {hasSubmenu && (
              <div
                className={`${
                  isMobile ? "navmenu-mobile-submenu" : "navmenu-submenu"
                } ${isOpen ? "open" : ""}`}
              >
                <RecursiveMenu
                  items={item.submenu}
                  location={location}
                  goTo={goTo}
                  level={level + 1}
                  isMobile={isMobile}
                  openSubmenu={openSubmenu}
                  setOpenSubmenu={setOpenSubmenu}
                  parentKey={`${key}-`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecursiveMenu;
