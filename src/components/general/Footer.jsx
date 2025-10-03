import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Button from "@components/ui/Button";
import FormField from "@components/ui/FormField";

// Dữ liệu Open Hours
const hours = [
  { day: "Monday", time: "9:00 - 24:00" },
  { day: "Tuesday", time: "9:00 - 24:00" },
  { day: "Wednesday", time: "9:00 - 24:00" },
  { day: "Thursday", time: "9:00 - 24:00" },
  { day: "Friday", time: "9:00 - 02:00" },
  { day: "Saturday", time: "9:00 - 02:00" },
  { day: "Sunday", time: "9:00 - 02:00" },
];

const instaImgs = [
  "/insta-1.jpg",
  "/insta-2.jpg",
  "/insta-3.jpg",
  "/insta-4.jpg",
  "/insta-5.jpg",
  "/insta-6.jpg",
];

// Hàm render đệ quy cho Open Hours
const renderHours = (list) => {
  if (!list.length) return null;
  const [first, ...rest] = list;
  return (
    <>
      <li className="footer-hour-item">
        <span className="footer-hour-day">{first.day}</span>
        <span className="footer-hour-time">{first.time}</span>
      </li>
      {renderHours(rest)}
    </>
  );
};

// Hàm render đệ quy cho Instagram
const renderInsta = (list) => {
  if (!list.length) return null;
  const [first, ...rest] = list;
  return (
    <>
      <div className="insta-img">
        <img src={first} alt="insta" />
      </div>
      {renderInsta(rest)}
    </>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* About */}
        <div className="footer-section footer-about">
          <h4 className="footer-title">Feliciano</h4>
          <p className="footer-text">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>
          <div className="social">
            <a href="#" className="social-link">
              <Twitter size={16} />
            </a>
            <a href="#" className="social-link">
              <Facebook size={16} />
            </a>
            <a href="#" className="social-link">
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Open Hours */}
        <div className="footer-section footer-hours">
          <h4 className="footer-title">Open Hours</h4>
          <ul className="footer-hours-list">{renderHours(hours)}</ul>
        </div>

        {/* Instagram */}
        <div className="footer-section footer-insta">
          <h4 className="footer-title">Instagram</h4>
          <div className="insta-grid">{renderInsta(instaImgs)}</div>
        </div>

        {/* Newsletter */}
        <div className="footer-section footer-newsletter">
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-text">
            Far far away, behind the word mountains, far from the countries.
          </p>
          <div className="form-field">
            <FormField type="email" placeholder="Enter email address" />
          </div>
          <Button className="newsletter-btn">Subscribe</Button>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        Copyright ©2025 All rights reserved | This template is made with ❤️ by
        Colorlib
      </div>
    </footer>
  );
};

export default Footer;
