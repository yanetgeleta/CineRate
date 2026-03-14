import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <p>{currentYear} CineRate.All rights reserved</p>
      <NavLink name="About" to="/about" />
      <NavLink name="Privacy Policy" to="/privacy-policy" />
      <NavLink name="Contact" to="/contact" />
    </div>
  );
};

export default Footer;
