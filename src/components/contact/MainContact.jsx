import BannerHero from "@components/ui/BannerHero";
import React from "react";
import Contact from "./Contact";

const MainContact = () => {
  return (
    <>
      <BannerHero
        title="Contact"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Contact</span> &gt;
          </>
        }
      />
      <Contact />
    </>
  );
};

export default MainContact;
