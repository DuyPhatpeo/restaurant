import React from "react";
import Button from "@components/ui/Button";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const MenuItem = ({ item, reverse }) => {
  const isMobile = useIsMobile();

  const CardContent = (
    <div className="menu-card">
      <div className="menu-title-row">
        <h3 className="menu-title">{item.title}</h3>
        <span className="menu-price">${item.price}</span>
      </div>
      <p className="menu-desc">{item.desc}</p>
      <Button hover>Order now</Button>
    </div>
  );

  const Image = <img src={item.img} alt={item.title} className="menu-image" />;

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
