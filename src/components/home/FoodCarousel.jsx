import React, { useEffect, useState } from "react";
import { getFoods } from "@/api/foodApi";

const FoodCarousel = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data.slice(-4));
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="food-carousel-wrapper">
      <div className="food-carousel-container">
        {foods.map((food) => (
          <div className="food-carousel-card" key={food.id}>
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
  );
};

export default FoodCarousel;
