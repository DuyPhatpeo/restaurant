import React, { useState, useEffect } from "react";
import banner1 from "/bg_1.jpg";
import banner2 from "/bg_2.jpg";
import banner3 from "/bg_3.jpg";
import FoodCarousel from "./FoodCarousel";

const Banner = () => {
  const slides = [
    { image: banner1, subtitle: "Feliciano", title: "Best Restaurant" },
    { image: banner2, subtitle: "Feliciano", title: "Fresh Foods" },
    { image: banner3, subtitle: "Feliciano", title: "Best Chef" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      {/* Banner Section */}
      <div
        className="banner-wrapper"
        style={{ backgroundImage: `url(${slides[current].image})` }}
      >
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <div className="banner-subtitle">{slides[current].subtitle}</div>
          <div className="banner-title">{slides[current].title}</div>
        </div>
      </div>

      <FoodCarousel />
    </>
  );
};

export default Banner;
