import { useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "@components/ui/Button";

const NavBar = ({
  scrolled,
  menuItems,
  mobileOpen,
  setMobileOpen,
  openSubmenu,
  setOpenSubmenu,
  goTo,
}) => {
  const location = useLocation();

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

        {/* Toggle Menu */}
        <div
          className={`mobile-toggle ${scrolled ? "scrolled" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="mobile-toggle-inner">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            <span>{mobileOpen ? "Close" : "Menu"}</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="nav-right">
          <div className="nav-menu">
            {menuItems.map((item, idx) => (
              <div key={idx} className="nav-item">
                <Link
                  to={item.link}
                  className={location.pathname === item.link ? "active" : ""}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown size={14} className="submenu-icon" />
                  )}
                </Link>

                {item.submenu && (
                  <div className="submenu">
                    {item.submenu.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        to={sub.link}
                        className={
                          location.pathname === sub.link ? "active" : ""
                        }
                        onClick={() => goTo(sub.link)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button onClick={() => goTo("/reservation")}>Book a table</Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {menuItems.map((item, idx) => (
          <div key={idx} className="mobile-item">
            <div
              className="mobile-item-header"
              onClick={() =>
                item.submenu
                  ? setOpenSubmenu(openSubmenu === idx ? null : idx)
                  : goTo(item.link)
              }
            >
              <span className={location.pathname === item.link ? "active" : ""}>
                {item.label}
              </span>
              {item.submenu && (
                <ChevronDown
                  size={18}
                  className={`chevron ${openSubmenu === idx ? "open" : ""}`}
                />
              )}
            </div>

            {item.submenu && (
              <div
                className={`mobile-submenu ${
                  openSubmenu === idx ? "open" : ""
                }`}
              >
                {item.submenu.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    to={sub.link}
                    className={location.pathname === sub.link ? "active" : ""}
                    onClick={() => goTo(sub.link)}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button onClick={() => goTo("/reservation")}>Book a table</Button>
      </div>
    </div>
  );
};

export default NavBar;
