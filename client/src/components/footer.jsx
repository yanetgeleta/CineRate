import React from "react";
import NavLink from "./Navlink";

const Footer = ()=> {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <p>{currentYear} CineRate.All rights reserved</p>
            <NavLink />
            <NavLink />
            <NavLink /> 
        </div>
    )
}

export default Footer;