import React from "react";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function Navbar() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface dark:bg-[#0B1326] backdrop-blur-xl bg-opacity-60 shadow-2xl shadow-blue-500/5">
      <div className="flex justify-between items-center px-8 py-4 max-w-[1920px] mx-auto font-['Inter'] tracking-tight antialiased">
        <div className="flex items-center gap-12">
          <NavLink
            className="text-2xl font-bold tracking-tighter text-blue-400 dark:text-[#ADC6FF]"
            to="/"
          >
            CineRate
          </NavLink>
          <div className="hidden md:flex gap-8 items-center">
            {" "}
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/shows">Shows</NavLink>
            {/* <NavLink to="/genres">Genres</NavLink> */}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {pathname !== "/search" && (
            <form className="relative group" onSubmit={handleSearch}>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                className="bg-surface-container-lowest border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-surface-tint transition-all duration-200"
                type="search"
                placeholder="Search for films"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                id="search"
              />
            </form>
          )}
          {darkMode ? (
            <IconButton onClick={() => [setDarkMode((pre) => !pre)]}>
              <LightModeOutlinedIcon />{" "}
            </IconButton>
          ) : (
            <IconButton onClick={() => [setDarkMode((pre) => !pre)]}>
              <DarkModeOutlinedIcon />
            </IconButton>
          )}
          {user && (
            <>
              {/* <NotificationRing /> */}
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </Button>
              <NavLink className="" to={`/profile/${user.id}`}>
                <span>
                  <ProfilePic className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95" />
                </span>
              </NavLink>
            </>
          )}

          {!user && (
            <>
              <Link to="/loginsignup" state={{ initialMode: "signup" }}>
                <Button>Sign Up</Button>
              </Link>
              <Link to="/loginsignup" state={{ initialMode: "login" }}>
                <Button>Log In</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
