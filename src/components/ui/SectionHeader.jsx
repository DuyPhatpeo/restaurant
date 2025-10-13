import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SectionHeader({ subtitle, title }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="section-header">
      {subtitle && (
        <h3 className="subtitle" data-aos="fade-up">
          {subtitle}
        </h3>
      )}
      {title && (
        <h2 className="title" data-aos="fade-up" data-aos-delay="200">
          {title}
        </h2>
      )}
    </div>
  );
}
