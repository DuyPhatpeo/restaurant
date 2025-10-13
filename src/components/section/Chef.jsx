// src/components/section/Chef.jsx
import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";
import { getChefs } from "@api/chefApi";

// 👉 Thêm AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function Chef() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Khởi tạo AOS
    AOS.init({
      duration: 1000, // thời gian hiệu ứng
      offset: 120, // khoảng cách trước khi trigger
      once: true, // chỉ chạy 1 lần
      easing: "ease-in-out",
    });

    const fetchChefs = async () => {
      try {
        const data = await getChefs(); // gọi API
        setChefs(data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) return <p>Loading chefs...</p>;

  return (
    <section className="chef-section" data-aos="fade-up">
      <SectionHeader subtitle="Chef" title="Our Master Chef" />

      <div className="chef-grid">
        {chefs.map((chef, index) => (
          <div
            className="chef-card"
            key={chef.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100} // tạo hiệu ứng xuất hiện lần lượt
          >
            <img
              src={chef.image}
              alt={chef.name}
              className="chef-image"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            />
            <h3 className="chef-name" data-aos="fade-right">
              {chef.name}
            </h3>
            <p className="chef-role" data-aos="fade-right" data-aos-delay="200">
              {chef.role}
            </p>

            <div
              className="chef-socials"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {chef.social?.twitter && (
                <a href={chef.social.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
              )}
              {chef.social?.facebook && (
                <a href={chef.social.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
              )}
              {chef.social?.google && (
                <a href={chef.social.google} target="_blank" rel="noreferrer">
                  <FaGooglePlusG />
                </a>
              )}
              {chef.social?.instagram && (
                <a
                  href={chef.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
