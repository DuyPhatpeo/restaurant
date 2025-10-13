import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";
import { getTestimonials } from "@api/testimonialApi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
    };
    fetchData();

    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="testimonial-section" data-aos="fade-up">
      <SectionHeader subtitle="Testimonial" title="Happy Customers" />

      <div
        className="testimonial-container"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={3}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            0: { slidesPerView: 1, centeredSlides: true },
            768: { slidesPerView: 2, centeredSlides: false },
            1024: { slidesPerView: 3, centeredSlides: false },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={t.id} className="testimonial-slide">
              <div
                className={`testimonial-card ${
                  activeIndex === index ? "active" : "inactive"
                }`}
              >
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
      </div>
    </section>
  );
}
