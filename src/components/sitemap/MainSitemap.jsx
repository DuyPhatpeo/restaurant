import BannerHero from "@components/ui/BannerHero";
import React from "react";
import Library from "@components/sitemap/Sitemap";

const MainLibrary = () => {
  return (
    <>
      <BannerHero
        title="Library"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Library</span> &gt;
          </>
        }
      />
      <Library />
    </>
  );
};

export default MainLibrary;
