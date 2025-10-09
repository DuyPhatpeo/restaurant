import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById, getBlogs } from "@api/blogApi";
import Loading from "@components/general/Loading";
import BlogSidebar from "@components/blog/BlogSidebar";
import BlogTags from "@components/blog/BlogTags";
import BlogComments from "@components/blog/BlogComments";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      setError("");
      try {
        const [data, allBlogs] = await Promise.all([
          getBlogById(id),
          getBlogs(),
        ]);

        const filteredBlogs = allBlogs.filter((item) => item.id !== id);

        setBlog({
          ...data,
          tags: data.tags || ["FOOD", "WINE", "DRINK", "DISH"],
        });
        setOtherBlogs(filteredBlogs.slice(0, 6));
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải bài viết. Vui lòng thử lại sau!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogData();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;
  if (!blog) return <p className="not-found">Bài viết không tồn tại.</p>;

  return (
    <>
      <section className="blog-detail">
        <div className="container">
          <div className="detail-layout">
            {/* Nội dung chính */}
            <div className="detail-main">
              <h2 className="detail-title">{blog.title}</h2>

              <p className="meta">
                <span>{blog.date}</span> • <span>{blog.author}</span>
              </p>

              {/* {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="detail-image"
                  loading="lazy"
                />
              )} */}

              <div
                className="detail-body"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <BlogTags tags={blog.tags} />
              <BlogComments />
            </div>

            {/* Sidebar */}
            <BlogSidebar blogs={otherBlogs} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
