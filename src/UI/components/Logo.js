import React from "react";
import { useNavigate } from "react-router";
import "./Logo.css";
import { FaHotel } from "react-icons/fa";
import { BiRadar } from "react-icons/bi";

const Logo = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <h1 className="logo-title">
        <FaHotel className={`logo-primary ${className}`} />
        Room <span className="logo-secondary">Scanner</span>{" "}
        <BiRadar className={`logo-secondary ${className}`} />
      </h1>
    </div>
  );
};

export default Logo;
