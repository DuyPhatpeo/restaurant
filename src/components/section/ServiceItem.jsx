import React from "react";

export default function ServiceItem({ icon: Icon, title, description }) {
  return (
    <div className="service-item-wrapper">
      <div className="service-item-icon">
        <Icon />
      </div>
      <h3 className="service-item-title">{title}</h3>
      <p className="service-item-desc">{description}</p>
    </div>
  );
}
