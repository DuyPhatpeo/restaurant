// src/components/general/NavBar.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "@components/ui/Button";
import RecursiveMenu from "./RecursiveMenu";

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

  // Đóng submenu khi đóng mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (!next) setOpenSubmenu([]);
      return next;
    });
  };

  const handleGoHome = () => goTo("/");
  const handleBookTable = () => goTo("/reservation");

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* ===== Logo ===== */}
        <div
          className={`logo ${scrolled ? "scrolled" : ""}`}
          onClick={handleGoHome}
        >
          Feliciano
        </div>

        {/* ===== Mobile Toggle ===== */}
        <div
          className={`mobile-toggle ${scrolled ? "scrolled" : ""}`}
          onClick={toggleMobileMenu}
        >
          <div className="mobile-toggle-inner">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            <span>{mobileOpen ? "Close" : "Menu"}</span>
          </div>
        </div>

        {/* ===== Desktop Menu ===== */}
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
          <Button onClick={handleBookTable}>Book a table</Button>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
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
          <Button onClick={handleBookTable}>Book a table</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
