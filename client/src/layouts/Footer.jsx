import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-solid border-white/10 px-6 py-6 mt-10 md:mx-20">
      <p>{currentYear} &copy; CineRate. All rights reserved</p>
      <div className="flex gap-1.5">
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
      </div>
    </footer>
  );
};

export default Footer;
