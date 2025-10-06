import BannerHero from "@components/ui/BannerHero";
import React from "react";
import BlogList from "./BlogList";

const MainBLog = () => {
  return (
    <>
      <BannerHero
        title="Blog"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Blog</span> &gt;
          </>
        }
      />
      <BlogList />
    </>
  );
};

export default MainBLog;
