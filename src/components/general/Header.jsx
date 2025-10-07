import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setOpenSubmenu([]);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileOpen) {
        setMobileOpen(false);
        setOpenSubmenu([]);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  /* ================= MENU ITEMS ================= */
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Menu", link: "/menu" },
    {
      label: "Stories",
      submenu: [
        { label: "Blog", link: "/blog" },
        {
          label: "Events",
          submenu: [
            { label: "Workshops", link: "/" },
            {
              label: "Meetups",
              link: "/",
            },
          ],
        },
      ],
    },
    { label: "Contact", link: "/contact" },
  ];

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
    setOpenSubmenu([]);
  };

  return (
    <header className="header-wrapper">
      <TopBar scrolled={scrolled} />
      <NavBar
        scrolled={scrolled}
        menuItems={menuItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
        goTo={goTo}
      />
    </header>
  );
};

export default Header;
