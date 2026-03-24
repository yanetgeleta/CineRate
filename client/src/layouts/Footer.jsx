import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="flex flex-col items-center gap-0.5 mt-4">
      <p>{currentYear} CineRate.All rights reserved</p>
      <div className="flex gap-1.5">
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/privacy-policy"}>Privacy Policy</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
      </div>
    </section>
  );
};

export default Footer;
