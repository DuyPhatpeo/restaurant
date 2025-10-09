import BannerHero from "@components/ui/BannerHero";
import React from "react";
import Sitemap from "@components/sitemap/Sitemap";

const MainSitemap = () => {
  return (
    <>
      <BannerHero
        title="Sitemap"
        bg="/bg_2.jpg"
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

export default MainSitemap;
