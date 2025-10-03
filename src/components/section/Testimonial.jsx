import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Ian Boner",
    role: "Food Critic",
    image: "/person_1.jpg",
    text: "The atmosphere is cozy and intimate, perfect for both casual dinners and special occasions. The wine selection perfectly complements their exquisite menu.",
  },
  {
    id: 2,
    name: "Jason McClean",
    role: "Regular Customer",
    image: "/person_2.jpg",
    text: "I've been dining here for years and the quality has never wavered. Their signature dishes are absolutely phenomenal. The service is always top-notch!",
  },
  {
    id: 3,
    name: "Mark Stevenson",
    role: "Food Blogger",
    image: "/person_3.jpg",
    text: "The fusion of traditional and modern cuisine here is brilliant. Each dish tells a story, and the presentation is Instagram-worthy. A must-visit restaurant!",
  },
  {
    id: 4,
    name: "Laura Smith",
    role: "Chef",
    image: "/person_4.jpg",
    text: "As a fellow chef, I'm impressed by their attention to detail and quality ingredients. The menu is thoughtfully crafted and the flavors are perfectly balanced.",
  },
];

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <SectionHeader subtitle="Testimonial" title="Happy Customers" />

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: true }, // mobile
          768: { slidesPerView: 2, centeredSlides: false }, // tablet
          1024: { slidesPerView: 3, centeredSlides: false }, // desktop
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id} className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-image">
                <img src={t.image} alt={t.name} />
                <div className="quote">
                  <FaQuoteLeft />
                </div>
              </div>
              <p className="testimonial-text">{t.text}</p>
              <h3 className="testimonial-name">{t.name}</h3>
              <span className="testimonial-role">{t.role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
