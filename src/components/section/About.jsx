import React, { useEffect, useState } from "react";
import about1 from "/about.jpg";
import about2 from "/about-1.jpg";
import SectionHeader from "@components/ui/SectionHeader";
import AOS from "aos";
import "aos/dist/aos.css";

// ================= AnimatedNumber =================
const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseInt(value.toString().replace(/,/g, ""), 10);
    if (end === 0) return;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * end);

      setCount(currentValue.toLocaleString());

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{count}</>;
};

// ================= AboutSection =================
const AboutSection = () => {
  const statsData = [
    { value: 18, label: "Years of Experienced" },
    { value: 100, label: "Menus/Dish" },
    { value: 50, label: "Staffs" },
    { value: 15000, label: "Happy Customers" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="about-section">
      <div className="about-section-container">
        {/* Images */}
        <div className="about-section-images" data-aos="fade-right">
          <img
            src={about1}
            alt="Chef preparing food"
            className="about-img main"
          />
          <img
            src={about2}
            alt="Cooking"
            className="about-img secondary"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
        </div>

        {/* Content */}
        <div
          className="about-section-content"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div className="section-header">
            <SectionHeader subtitle="About" title="Feliciano Restaurant" />
          </div>
          <p className="desc">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>
          <p className="time">
            Mon – Fri <span>8 AM – 11 PM</span>
          </p>
          <p className="phone">+1-978-123-4567</p>
        </div>
      </div>

      {/* Stats */}
      <div
        className="about-section-stats"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="stat-item"
            data-aos="zoom-in"
            data-aos-delay={index * 250}
          >
            <h3 className="stat-number">
              <AnimatedNumber value={stat.value} />
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}

        {/* Extra description */}
        <div className="stat-desc" data-aos="fade-up" data-aos-delay="600">
          <p>
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
