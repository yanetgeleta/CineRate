import React from "react";
import { Link, NavLink } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
// import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
// import XIcon from "@mui/icons-material/X";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-solid border-white/10 px-6 py-6 mt-10 md:mx-20">
      <p>{currentYear} &copy; CineRate. All rights reserved</p>
      <div className="flex gap-1.5">
        <Link target="_blank" to={"https://github.com/yanetgeleta"}>
          <GitHubIcon />
        </Link>
        <Link target="_blank" to={"https://www.linkedin.com/in/yanet-gudisa/"}>
          <LinkedInIcon />
        </Link>
        <Link target="_blank" to={"https://wa.me/+251941493222"}>
          <WhatsAppIcon />
        </Link>
        <Link target="_blank" to={"https://www.instagram.com/yanet_geleta/"}>
          <InstagramIcon />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
