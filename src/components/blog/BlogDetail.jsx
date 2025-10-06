import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "@api/blogApi";
import Loading from "@components/general/Loading";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      setBlog(null);
      try {
        const data = await getBlogById(id);
        setBlog({
          ...data,
          tags: ["FOOD", "WINE", "DRINK", "DISH"],
        });
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải bài viết. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!blog) return <p className="not-found">Bài viết không tồn tại.</p>;

  return (
    <section className="blog-detail">
      <div className="container">
        <div className="detail-layout">
          <div className="detail-main">
            <h2 className="detail-title">{blog.title}</h2>

            <p className="meta">
              <span>{blog.date}</span> • <span>{blog.author}</span> •{" "}
              <span>{blog.comments} bình luận</span>
            </p>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="detail-image"
                loading="lazy"
              />
            )}

            <div
              className="detail-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tag section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="blog-tags">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="tag-item">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
