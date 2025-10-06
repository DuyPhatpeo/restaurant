import React, { useEffect, useState } from "react";
import SectionHeader from "@components/ui/SectionHeader";
import { getBlogs } from "@api/blogApi";
import Pagination from "@components/ui/Pagination";
import BlogItem from "@components/section/BlogItem";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // state phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  // Tính toán phân trang
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="blog-section">
      <div className="container">
        {loading ? (
          <p>Đang tải bài viết...</p>
        ) : posts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          <>
            {/* List blogs */}
            <div className="blog-grid">
              {currentPosts.map((post) => (
                <BlogItem key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogList;
