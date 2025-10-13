import React, { useEffect, useState } from "react";
import SectionHeader from "@components/ui/SectionHeader";
import { getBlogs } from "@api/blogApi";
import BlogItem from "@components/section/BlogItem";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Init AOS ---
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  }, []);

  // --- Fetch blogs ---
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setPosts(data || []);
        setTimeout(() => AOS.refresh(), 200); // Làm mới hiệu ứng sau khi render
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
            {posts.slice(0, 3).map((post, index) => (
              <div
                key={post.id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 150}
              >
                <BlogItem post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
