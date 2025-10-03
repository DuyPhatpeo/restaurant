import BannerHero from "@components/ui/BannerHero";
import AboutSection from "@components/section/About";
import MasterChef from "@components/section/Chef";
import Testimonial from "@components/section/Testimonial";
import React from "react";
import Services from "@components/section/Services";

const MainAbout = () => {
  return (
    <>
      <BannerHero
        title="About"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>About</span> &gt;
          </>
        }
      />
      <AboutSection />
      <Services />
      <MasterChef />
      <Testimonial />
    </>
  );
};

export default MainAbout;
