import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";
import { getTestimonials } from "@api/testimonialApi"; // import service

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
    };
    fetchData();
  }, []);

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
