import React from "react";
import NavLink from "./navlink";

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