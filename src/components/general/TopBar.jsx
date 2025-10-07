import { Phone, Mail } from "lucide-react";

const TopBar = ({ scrolled }) => {
  return (
    <div className={`top-bar ${scrolled ? "scrolled" : ""}`}>
      <div className="top-bar-container">
        <div className="top-bar-item">
          <Phone size={14} /> +1235 2355 98
        </div>
        <div className="top-bar-item">
          <Mail size={14} /> youremail@email.com
        </div>
        <div className="top-bar-item">
          Open hours: Mon - Sun 8:00AM - 9:00PM
        </div>
      </div>
    </div>
  );
};

export default TopBar;
