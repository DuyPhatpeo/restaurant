import React, { useEffect } from "react";

export default function LibraryItem({ item, onClick }) {
  useEffect(() => {
    const el = document.querySelector(".library-item:last-child");
    if (!el) return;
    const grid = el.parentElement;
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("gap")
    );
    const rowSpan = Math.ceil(
      (el.querySelector("img,video").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    el.style.setProperty("--row-span", rowSpan);
  }, []);

  return (
    <div className="library-item" onClick={onClick}>
      {item.type === "video" ? (
        <video src={item.src} controls />
      ) : (
        <img src={item.src} alt={item.alt || "media"} />
      )}
    </div>
  );
}
