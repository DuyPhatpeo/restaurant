import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, getBlogs } from "@api/blogApi";
import Loading from "@components/general/Loading";
import BlogSidebar from "@components/blog/BlogSidebar";
import BlogTags from "@components/blog/BlogTags";
import BlogComments from "@components/blog/BlogComments";
import ReactMarkdown from "react-markdown";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getBlogById(id);
        const allBlogs = await getBlogs();

        const filteredBlogs = allBlogs.filter((item) => item.id !== id);

        setBlog({
          ...data,
          tags: ["FOOD", "WINE", "DRINK", "DISH"],
        });
        setOtherBlogs(filteredBlogs.slice(0, 4));
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
              <span>{blog.date}</span> • <span>{blog.author}</span>
            </p>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="detail-image"
                loading="lazy"
              />
            )}

            <div className="detail-body">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <BlogTags tags={blog.tags} />
            <BlogComments />
          </div>

          <BlogSidebar blogs={otherBlogs} />
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
