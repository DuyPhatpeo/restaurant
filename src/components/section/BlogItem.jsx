import React, { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogItem = ({ post, index }) => {
  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // thời gian chạy hiệu ứng (ms)
      easing: "ease-out-cubic",
      once: true, // chỉ chạy 1 lần
      offset: 50, // khoảng cách trước khi kích hoạt
    });
  }, []);

  return (
    <div
      className="blog-card"
      data-aos="fade-up" // 👈 hiệu ứng xuất hiện từ dưới lên
      data-aos-delay={index ? index * 100 : 0} // mỗi card trễ 1 chút cho mượt
    >
      {/* Ảnh — có thể click */}
      {post.image && (
        <Link to={`/blog/${post.id}`} className="blog-image-wrapper">
          <img
            src={post.image}
            alt={post.title}
            className="blog-image"
            data-aos="fade-up"
            data-aos-delay={index ? index * 100 + 100 : 100}
          />
        </Link>
      )}

      {/* Nội dung */}
      <div
        className="blog-content"
        data-aos="fade-up"
        data-aos-delay={index ? index * 100 + 200 : 200}
      >
        <p className="meta">
          {post.date || "No date"} <span>• {post.author || "Admin"}</span>
        </p>

        {/* Tiêu đề (có thể click) */}
        <h4 className="post-title">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h4>

        <div className="blog-footer">
          <Link to={`/blog/${post.id}`} className="read-more">
            Read more
          </Link>

          {/* Biểu tượng bình luận (nếu cần) */}
          <div className="comments">
            <MessageSquare size={18} />
            <span>{post.comments || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
