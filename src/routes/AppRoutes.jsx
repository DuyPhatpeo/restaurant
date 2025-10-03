import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "@components/general/Loading";

// Lazy load các trang
const HomePage = lazy(() => import("@pages/HomePage"));
const AboutPage = lazy(() => import("@pages/AboutPage"));
const MenuPage = lazy(() => import("@pages/MenuPage"));
const ContactPage = lazy(() => import("@pages/ContactPage"));
const ReservaitonPage = lazy(() => import("@pages/ReservaitonPage"));
const NotFound = lazy(() => import("@pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/reservation" element={<ReservaitonPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
