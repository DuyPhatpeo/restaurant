import BannerHero from "@components/ui/BannerHero";
import React from "react";
import Reservation from "./Reservation";

const MainReservation = () => {
  return (
    <>
      <BannerHero
        title="Book a Table"
        bg="/bg_3.jpg"
        breadcrumb={
          <>
            <a href="/">Home</a> &gt; <span>Reservation</span> &gt;
          </>
        }
      />
      <Reservation />
    </>
  );
};

export default MainReservation;
