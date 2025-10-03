import React from "react";

export default function SectionHeader({ subtitle, title }) {
  return (
    <div className="section-header">
      {subtitle && <h3 className="subtitle">{subtitle}</h3>}
      {title && <h2 className="title">{title}</h2>}
    </div>
  );
}
