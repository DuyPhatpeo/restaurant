// src/components/general/Header.jsx
import React, { useState, useEffect } from "react";
import { Phone, Mail, Menu } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Menu", link: "/menu" },
    { label: "Stories", link: "/stories" },
    { label: "Contact", link: "/contact" },
  ];

  // helper navigate + scroll
  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
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

          <div
            className={`mobile-toggle ${scrolled ? "scrolled" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="mobile-toggle-inner">
              <Menu size={24} /> <span>Menu</span>
            </div>
          </div>

          <div className="nav-right">
            <div className="nav-menu">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className={location.pathname === item.link ? "active" : ""}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button onClick={() => goTo("/reservation")}>Book a table</Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={location.pathname === item.link ? "active" : ""}
              onClick={() => goTo(item.link)}
            >
              {item.label}
            </Link>
          ))}
          <Button onClick={() => goTo("/reservation")}>Book a table</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
