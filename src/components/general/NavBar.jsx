import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@components/ui/Button";

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
        isMobile ? "mobile-menu-level" : "menu-level"
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
            if (isMobile) setOpenSubmenu([]); // đóng tất cả submenu khi điều hướng
          }
        };

        return (
          <div key={key} className={`menu-item level-${level}`}>
            {isMobile ? (
              <div className="mobile-item-header" onClick={handleClick}>
                <span className={isActive ? "active" : ""}>{item.label}</span>
                {hasSubmenu && (
                  <ChevronDown
                    size={16}
                    className={`chevron ${isOpen ? "open" : ""}`}
                  />
                )}
              </div>
            ) : (
              <Link
                to={item.link || "#"}
                className={`menu-link ${isActive ? "active" : ""}`}
                onClick={hasSubmenu ? undefined : handleClick}
              >
                {item.label}
                {hasSubmenu && (
                  <ChevronDown size={14} className="submenu-icon" />
                )}
              </Link>
            )}

            {hasSubmenu && (
              <div
                className={`${isMobile ? "mobile-submenu" : "submenu"} ${
                  isOpen ? "open" : ""
                }`}
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

const NavBar = ({
  scrolled = false,
  menuItems = [],
  mobileOpen,
  setMobileOpen,
  openSubmenu,
  setOpenSubmenu,
  goTo,
}) => {
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (!next) setOpenSubmenu([]); // đóng submenu khi đóng mobile menu
      return next;
    });
  };

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <div
          className={`logo ${scrolled ? "scrolled" : ""}`}
          onClick={() => goTo("/")}
        >
          Feliciano
        </div>

        {/* Mobile Toggle */}
        <div
          className={`mobile-toggle ${scrolled ? "scrolled" : ""}`}
          onClick={toggleMobileMenu}
        >
          <div className="mobile-toggle-inner">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            <span>{mobileOpen ? "Close" : "Menu"}</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="nav-right">
          <div className="nav-menu">
            <RecursiveMenu
              items={menuItems}
              location={location}
              goTo={goTo}
              openSubmenu={openSubmenu}
              setOpenSubmenu={setOpenSubmenu}
            />
          </div>
          <Button onClick={() => goTo("/reservation")}>Book a table</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <RecursiveMenu
          items={menuItems}
          location={location}
          goTo={goTo}
          isMobile
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
        />
        <div className="mobile-book-btn">
          <Button onClick={() => goTo("/reservation")}>Book a table</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
