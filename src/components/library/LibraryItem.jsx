import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function LibraryItem({ item }) {
  const itemRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // ========== Auto grid row span ==========
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

  // ========== Zoom control ==========
  const handleZoom = () => setIsZoomed(true);
  const handleCloseZoom = () => setIsZoomed(false);

  // ========== ESC key + Lock scroll ==========
  useEffect(() => {
    if (isZoomed) {
      // Khóa scroll nền
      document.body.style.overflow = "hidden";

      // Lắng nghe phím Esc
      const handleKeyDown = (e) => {
        if (e.key === "Escape") handleCloseZoom();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        // Mở lại scroll + gỡ sự kiện
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isZoomed]);

  return (
    <>
      <div ref={itemRef} className="library-item" onClick={handleZoom}>
        {item.type === "video" ? (
          <video src={item.src} controls />
        ) : (
          <img src={item.src} alt={item.alt || "media"} />
        )}
      </div>

      {isZoomed && (
        <div className="zoom-overlay" onClick={handleCloseZoom}>
          {/* Nút đóng */}
          <button
            className="zoom-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseZoom();
            }}
            aria-label="Close zoom view"
          >
            <X size={28} />
          </button>

          {/* Nội dung phóng to */}
          {item.type === "video" ? (
            <video src={item.src} controls autoPlay />
          ) : (
            <img src={item.src} alt={item.alt || "zoomed media"} />
          )}
        </div>
      )}
    </>
  );
}
