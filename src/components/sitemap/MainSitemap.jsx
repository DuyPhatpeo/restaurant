import BannerHero from "@components/ui/BannerHero";
import React from "react";
import Sitemap from "@components/sitemap/Sitemap";

const MainLibrary = () => {
  return (
    <>
      <BannerHero
        title="Sitemap"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Sitemap</span> &gt;
          </>
        }
      />
      <Sitemap />
    </>
  );
};

export default MainLibrary;
