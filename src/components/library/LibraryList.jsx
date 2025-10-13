import React, { useEffect, useRef, useState } from "react";
import { getLibrary } from "@api/libraryApi";
import LibraryItem from "./LibraryItem";
import Button from "@components/ui/button";

export default function LibraryList() {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef();

  // --- Lấy dữ liệu từ API ---
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await getLibrary();
        setItems(data);
      } catch (err) {
        setError("Lỗi khi tải thư viện");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  // --- Tính toán chiều cao masonry ---
  useEffect(() => {
    if (!gridRef.current) return;
    const grid = gridRef.current;

    const updateHeights = () => {
      const rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
      );
      const gap = parseInt(
        window.getComputedStyle(grid).getPropertyValue("gap")
      );
      const items = grid.querySelectorAll(".library-item");

      items.forEach((item) => {
        const media = item.querySelector("img, video");
        if (!media) return;

        const setRowSpan = () => {
          const height = media.getBoundingClientRect().height;
          const rowSpan = Math.ceil((height + gap) / (rowHeight + gap));
          item.style.setProperty("--row-span", rowSpan);
        };

        if (media.complete || media.readyState >= 2) {
          setRowSpan();
        } else {
          media.addEventListener("load", setRowSpan);
          media.addEventListener("loadedmetadata", setRowSpan);
        }
      });
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [items, visibleCount]);

  // --- Load thêm ---
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) return <p>Đang tải thư viện...</p>;
  if (error) return <p>{error}</p>;

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div>
      <div className="library-grid" ref={gridRef}>
        {visibleItems.map((item) => (
          <LibraryItem
            key={item.id}
            item={item}
            onClick={() => console.log("Clicked item:", item.id)}
          />
        ))}
      </div>

      {visibleCount < items.length && (
        <div className="button-see-more">
          <Button onClick={handleLoadMore}>Xem thêm</Button>
        </div>
      )}
    </div>
  );
}
