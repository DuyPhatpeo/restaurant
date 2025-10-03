import React from "react";

const BannerHero = ({ title, bg, breadcrumb }) => {
  return (
    <div className="hero-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        {breadcrumb && <div className="breadcrumb">{breadcrumb}</div>}
      </div>
    </div>
  );
};

export default BannerHero;
