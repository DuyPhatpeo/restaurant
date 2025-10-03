import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import SectionHeader from "@components/ui/SectionHeader";
import { getBlogs } from "@api/blogApi";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setPosts(data || []); // nếu API rỗng thì set []
      } catch (error) {
        console.error("Không thể tải blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="blog-section py-12">
      <div className="container">
        {/* Tiêu đề */}
        <SectionHeader subtitle="Blog" title="Recent Posts" />

        {/* Loading / Empty state */}
        {loading ? (
          <p>Đang tải bài viết...</p>
        ) : posts.length === 0 ? (
          <p>Chưa có bài viết nào.</p>
        ) : (
          <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                className="blog-card border rounded-lg overflow-hidden shadow-sm"
                key={post.id}
              >
                {/* Ảnh */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-image w-full h-48 object-cover"
                  />
                )}

                {/* Nội dung */}
                <div className="blog-content p-4">
                  <p className="meta text-sm text-gray-500 mb-2">
                    {post.date || "No date"}{" "}
                    <span>• {post.author || "Admin"}</span>
                  </p>
                  <h4 className="post-title text-lg font-semibold mb-3">
                    {post.title}
                  </h4>
                  <div className="blog-footer flex justify-between items-center text-sm text-blue-600">
                    <a href="#" className="hover:underline">
                      Read more
                    </a>
                    <span className="comments flex items-center gap-1 text-gray-500">
                      <MessageSquare size={16} /> {post.comments ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
