import BannerHero from "@components/ui/BannerHero";
import React from "react";
import Menu from "./Menu";

const MainMenu = () => {
  return (
    <>
      <BannerHero
        title="Menu"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Menu</span> &gt;
          </>
        }
      />
      <Menu />
    </>
  );
};

export default MainMenu;
