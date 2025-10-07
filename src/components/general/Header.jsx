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

  // 🌀 Scroll to top khi đổi route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // 🎯 Theo dõi khi user cuộn trang
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    {
      label: "Menu",
      link: "/menu",
    },
    {
      label: "Stories",
      submenu: [
        { label: "Blog", link: "/blog" },
        {
          label: "Events",
          submenu: [
            { label: "Workshops", link: "/stories/events/workshops" },
            { label: "Meetups", link: "/stories/events/meetups" },
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
    setOpenSubmenu(null);
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
