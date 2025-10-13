import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BannerHero = ({ title, bg, breadcrumb }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="hero-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-content">
        <h1 data-aos="fade-up">{title}</h1>
        {breadcrumb && (
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="200">
            {breadcrumb}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerHero;
