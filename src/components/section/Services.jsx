import React from "react";
import { FaBirthdayCake, FaUsers, FaConciergeBell } from "react-icons/fa";
import SectionHeader from "@components/ui/SectionHeader";
import ServiceItem from "./ServiceItem";

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
  return (
    <section className="services-wrapper">
      <SectionHeader subtitle="Services" title="Catering Services" />
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}
