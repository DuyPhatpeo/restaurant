import React, { useEffect, useState } from "react";
import SectionHeader from "@components/ui/SectionHeader";
import { getBlogs } from "@api/blogApi";
import BlogItem from "@components/section/BlogItem";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Khởi tạo AOS chỉ 1 lần ---
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  }, []);

  // --- Lấy dữ liệu blog ---
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setPosts(data || []);
        // Làm mới hiệu ứng sau khi render dữ liệu
        setTimeout(() => AOS.refresh(), 200);
      } catch (error) {
        console.error("Không thể tải blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="blog-section" data-aos="fade-up">
      <div className="container">
        <SectionHeader
          subtitle="Blog"
          title="Recent Posts"
          data-aos="fade-down"
        />

        {loading ? (
          <p>Đang tải bài viết...</p>
        ) : posts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          <div className="blog-grid">
            {posts.slice(0, 3).map((post) => (
              <BlogItem post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
