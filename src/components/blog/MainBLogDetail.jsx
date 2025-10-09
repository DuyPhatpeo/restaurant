import BannerHero from "@components/ui/BannerHero";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import { getBlogById } from "@api/blogApi";

const MainBLogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError(`Failed to load blog: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <BannerHero
        title={blog?.title || "Blog"}
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt;{" "}
            <span>{blog?.title || "Detail"}</span>
          </>
        }
      />
      <BlogDetail blog={blog} />
    </>
  );
};

export default MainBLogDetail;
