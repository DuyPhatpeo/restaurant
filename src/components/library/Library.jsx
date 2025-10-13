import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ZoomIn } from "lucide-react";
import SectionHeader from "@components/ui/SectionHeader";
import Button from "@components/ui/button";
import { getLibrary } from "@api/libraryApi";

export default function Library() {
  const [mediaList, setMediaList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9); // số lượng hiển thị ban đầu
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

  useEffect(() => {
    document.body.style.overflow = selectedMedia ? "hidden" : "";
  }, [selectedMedia]);

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
      <SectionHeader subtitle="Library" title="Library of Moments" />

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

      {selectedMedia && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
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
