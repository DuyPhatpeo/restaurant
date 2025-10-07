// src/components/general/Header.jsx
import React, { useState, useEffect } from "react";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@components/ui/Button";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Menu", link: "/menu" },
    {
      label: "Stories",
      submenu: [
        { label: "Blog", link: "/blog" },
        { label: "Events", link: "/stories/events" },
      ],
    },
    { label: "Contact", link: "/contact" },
  ];

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <header className="header-wrapper">
      <ScrollToTop />

      {/* Top Bar */}
      <div className={`top-bar ${scrolled ? "scrolled" : ""}`}>
        <div className="top-bar-container">
          <div className="top-bar-item">
            <Phone size={14} /> +1235 2355 98
          </div>
          <div className="top-bar-item">
            <Mail size={14} /> youremail@email.com
          </div>
          <div className="top-bar-item">
            Open hours: Mon - Sun 8:00AM - 9:00PM
          </div>
        </div>
      </div>

      {/* NavBar */}
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
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
                <span
                  className={location.pathname === item.link ? "active" : ""}
                >
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
    </header>
  );
};

export default Header;
