import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "@components/ui/Button";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1200);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const MenuItem = ({ item, reverse }) => {
  const isMobile = useIsMobile();

  // ✅ Khởi tạo AOS một lần
  useEffect(() => {
    AOS.init({
      duration: 800, // thời gian hiệu ứng (ms)
      easing: "ease-out-cubic",
      once: true, // chỉ chạy 1 lần
      offset: 50, // khoảng cách trước khi bắt đầu hiệu ứng
    });
  }, []);

  const CardContent = (
    <div
      className="menu-card"
      data-aos="fade-up" // 👈 Hiệu ứng trượt từ dưới lên
    >
      <div className="menu-title-row">
        <h3 className="menu-title">{item.title}</h3>
        <span className="menu-price">${item.price}</span>
      </div>
      <p className="menu-desc">{item.desc}</p>
      <Button hover>Order now</Button>
    </div>
  );

  const Image = (
    <img
      src={item.img}
      alt={item.title}
      className="menu-image"
      data-aos="fade-up" // 👈 thêm hiệu ứng cho ảnh luôn
      data-aos-delay="100" // delay nhẹ cho mượt
    />
  );

  if (isMobile)
    return (
      <>
        {Image}
        {CardContent}
      </>
    );

  return reverse ? (
    <>
      {CardContent}
      {Image}
    </>
  ) : (
    <>
      {Image}
      {CardContent}
    </>
  );
};

export default MenuItem;
