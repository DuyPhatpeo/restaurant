import React from "react";
import { MessageSquare } from "lucide-react";
import SectionHeader from "@components/ui/SectionHeader";

const posts = [
  {
    id: 1,
    image: "/image_1.jpg",
    date: "Sept. 06, 2019",
    author: "Admin",
    title: "Taste the delicious foods in Asia",
    comments: 3,
  },
  {
    id: 2,
    image: "/image_2.jpg",
    date: "Sept. 06, 2019",
    author: "Admin",
    title: "Taste the delicious foods in Asia",
    comments: 3,
  },
  {
    id: 3,
    image: "/image_3.jpg",
    date: "Sept. 06, 2019",
    author: "Admin",
    title: "Taste the delicious foods in Asia",
    comments: 3,
  },
];

const Blog = () => {
  return (
    <section className="blog-section">
      <div className="container">
        {/* Tiêu đề */}
        <SectionHeader subtitle="Blog" title="Recent Posts" />

        {/* Danh sách bài viết */}
        <div className="blog-grid">
          {posts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <p className="meta">
                  {post.date} <span>{post.author}</span>
                </p>
                <h4 className="post-title">{post.title}</h4>
                <div className="blog-footer">
                  <a href="#">Read more</a>
                  <span className="comments">
                    <MessageSquare size={16} /> {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
