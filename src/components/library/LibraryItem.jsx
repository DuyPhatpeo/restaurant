import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LibraryItem({ item, onClick, index = 0 }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const grid = el.parentElement;
    const styles = window.getComputedStyle(grid);
    const rowHeight = parseInt(styles.getPropertyValue("grid-auto-rows"));
    const rowGap = parseInt(styles.getPropertyValue("gap"));
    const media = el.querySelector("img,video");

    if (media) {
      const updateRowSpan = () => {
        const height = media.getBoundingClientRect().height;
        const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
        el.style.setProperty("--row-span", rowSpan);
      };

      if (media.complete || media.readyState >= 2) updateRowSpan();
      else media.addEventListener("load", updateRowSpan);

      return () => media.removeEventListener("load", updateRowSpan);
    }
  }, []);

  return (
    <div
      ref={itemRef}
      className="library-item"
      onClick={onClick}
      data-aos="fade-up"
      data-aos-delay={index * 100} // tạo hiệu ứng lần lượt
      data-aos-duration="700"
      data-aos-easing="ease-out-cubic"
    >
      {item.type === "video" ? (
        <video src={item.src} controls />
      ) : (
        <img src={item.src} alt={item.alt || "media"} />
      )}
    </div>
  );
}
