import React from "react";
import Banner from "./Banner";
import About from "@components/section/About";
import Services from "@components/section/Services";
import Menu from "@components/home/Menu";
import Chef from "@components/section/Chef";
import Testimonial from "@components/section/Testimonial";
import ReservationForm from "./Reservation";
import Blog from "./Blog";

const MainHome = () => {
  return (
    <>
      <Banner />
      <About />
      <Services />
      <Menu />
      <Chef />
      <ReservationForm />
      <Testimonial />
      <Blog />
    </>
  );
};

export default MainHome;
