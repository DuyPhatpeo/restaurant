import BannerHero from "@components/ui/BannerHero";
import React from "react";
import LibraryList from "./LibraryList";

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
      <LibraryList />
    </>
  );
};

export default MainLibrary;
