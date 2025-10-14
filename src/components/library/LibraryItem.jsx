import React, { useEffect, useRef } from "react";

export default function LibraryItem({ item, onClick }) {
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
    <div ref={itemRef} className="library-item" onClick={onClick}>
      {item.type === "video" ? (
        <video src={item.src} controls />
      ) : (
        <img src={item.src} alt={item.alt || "media"} />
      )}
    </div>
  );
}
