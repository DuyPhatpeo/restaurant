import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import BannerHero from "@components/ui/BannerHero";
import "@styles/base/NotFound.css";
import Button from "@components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <BannerHero
        title="Not Found"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Not Found</span>
          </>
        }
      />
      <div className="notfound-wrapper">
        <div className="notfound-code">404</div>
        <div className="notfound-message">
          Oops! Trang bạn tìm không tồn tại.
        </div>
        <Button onClick={() => navigate("/")}>Back Home</Button>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
