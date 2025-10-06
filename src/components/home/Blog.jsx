import React, { useEffect, useState } from "react";
import SectionHeader from "@components/ui/SectionHeader";
import { getBlogs } from "@api/blogApi";
import BlogItem from "@components/section/BlogItem";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setPosts(data || []);
      } catch (error) {
        console.error("Không thể tải blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="blog-section">
      <div className="container">
        <SectionHeader subtitle="Blog" title="Recent Posts" />

        {loading ? (
          <p>Đang tải bài viết...</p>
        ) : posts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          <div className="blog-grid">
            {posts.slice(0, 3).map((post) => (
              <BlogItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
