import React, { useEffect, useState } from "react";
import { getFoods } from "@/api/foodApi";
import AOS from "aos";
import "aos/dist/aos.css";

const FoodCarousel = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="food-carousel-wrapper">
      <div className="food-carousel-inner">
        <div className="food-carousel-container">
          {foods.map((food, index) => (
            <div
              className="food-carousel-card"
              key={food.id}
              data-aos="fade-up"
              data-aos-delay={index * 150} // hiệu ứng nối tiếp
            >
              <img
                className="food-carousel-image"
                src={food.img}
                alt={food.title}
              />
              <div className="food-carousel-title">{food.title}</div>
              <div className="food-carousel-desc">{food.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCarousel;
