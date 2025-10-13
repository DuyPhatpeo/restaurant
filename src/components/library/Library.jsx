import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ZoomIn, X } from "lucide-react";
import Button from "@components/ui/button";
import { getLibrary } from "@api/libraryApi";

export default function Library() {
  const [mediaList, setMediaList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchData = async () => {
      try {
        const data = await getLibrary();
        setMediaList(data);
      } catch (err) {
        console.error("Không thể tải dữ liệu thư viện:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ẩn scroll khi mở lightbox
  useEffect(() => {
    document.body.style.overflow = selectedMedia ? "hidden" : "";
  }, [selectedMedia]);

  // Đóng lightbox khi nhấn ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeLightbox = (e) => {
    if (e.target.classList.contains("lightbox")) setSelectedMedia(null);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading)
    return (
      <section className="library-section">
        <p className="text-center">Đang tải thư viện...</p>
      </section>
    );

  return (
    <section className="library-section">
      <div className="library-grid">
        {mediaList.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className={`library-item ${item.type}`}
            data-aos="zoom-in"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === "image" ? (
              <img src={item.src} alt={item.alt} loading="lazy" />
            ) : (
              <video src={item.src} muted playsInline preload="metadata" />
            )}
            <div className="library-overlay">
              <ZoomIn />
            </div>
          </div>
        ))}
      </div>

      {/* Nút xem thêm */}
      {visibleCount < mediaList.length && (
        <div className="library-btn-wrapper">
          <Button onClick={handleShowMore} hover>
            See more
          </Button>
        </div>
      )}

      {/* Lightbox popup */}
      {selectedMedia && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            {/* Nút đóng */}
            <button
              className="lightbox-close"
              onClick={() => setSelectedMedia(null)}
              aria-label="Đóng"
            >
              <X />
            </button>

            {selectedMedia.type === "image" ? (
              <img src={selectedMedia.src} alt={selectedMedia.alt} />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                preload="metadata"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
