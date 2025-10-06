import BannerHero from "@components/ui/BannerHero";
import React from "react";
import BlogDetail from "./BlogDetail";

const MainBLogDetail = () => {
  return (
    <>
      <BannerHero
        title="Blog"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt;{" "}
            <span>blog detail</span> &gt;
          </>
        }
      />
      <BlogDetail />
    </>
  );
};

export default MainBLogDetail;
