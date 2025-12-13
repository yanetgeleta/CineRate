import React from "react";
import NavLink from "../components/NavLink";

const Footer = ()=> {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <p>{currentYear} CineRate.All rights reserved</p>
            <NavLink name="About" path="/about" />
            <NavLink name="Privacy Policy" path="/privacy-policy" />
            <NavLink name="Contact" path="/contact" /> 
        </div>
    )
}

export default Footer;