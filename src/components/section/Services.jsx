import React, { useEffect } from "react";
import { FaBirthdayCake, FaUsers, FaConciergeBell } from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";
import ServiceItem from "./ServiceItem";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    icon: FaBirthdayCake,
    title: "Birthday Party",
    description:
      "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
  {
    icon: FaUsers,
    title: "Business Meetings",
    description:
      "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
  {
    icon: FaConciergeBell,
    title: "Wedding Party",
    description:
      "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
  },
];

export default function Services() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="services-wrapper" data-aos="fade-up">
      <SectionHeader subtitle="Services" title="Catering Services" />

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} data-aos="zoom-in" data-aos-delay={index * 150}>
            <ServiceItem
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
