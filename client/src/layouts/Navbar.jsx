import React from "react";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1326] backdrop-blur-xl bg-opacity-60 shadow-2xl shadow-blue-500/5 max-h-20">
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
            <NavLink
              className={({ isActive }) =>
                `text-lg text-slate-400 hover:text-blue-300  duration-200 ease-out active:scale-95 transition-all ${isActive ? "underline decoration-[#ADC6FF] decoration-2 underline-offset-4" : ""}`
              }
              // className="text-lg text-slate-400 hover:text-blue-300  duration-200 ease-out active:scale-95 transition-all"
              to="/movies"
            >
              Movies
            </NavLink>
            <NavLink
              to="/shows"
              className={({ isActive }) =>
                `text-lg text-slate-400 hover:text-blue-300  duration-200 ease-out active:scale-95 transition-all ${isActive ? "underline decoration-[#ADC6FF] decoration-2 underline-offset-4" : ""}`
              }
            >
              Shows
            </NavLink>
            {/* <NavLink to="/genres">Genres</NavLink> */}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {pathname !== "/search" && (
            <form className="relative group" onSubmit={handleSearch}>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                className="bg-[#060e20] border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-[#adc6ff] transition-all duration-200"
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
          {user && (
            <div className="flex gap-1.5 items-center justify-center">
              {/* <NotificationRing /> */}
              <button
                className="flex items-center justify-center bg-[#262348] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#262348]/8 transition-colors min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-10 px-4 active:scale-95"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </button>
              <NavLink className="" to={`/profile/${user.id}`}>
                <span>
                  <ProfilePic imgClass="size-15 flex items-center justify-center rounded-full hover:scale-105 transition-all active:scale-95" />
                </span>
              </NavLink>
            </div>
          )}

          {!user && (
            <div className="hidden md:flex gap-2">
              <Link
                className="flex items-center justify-center bg-blue-400 text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-blue-400/90 transition-colors min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-10 px-4"
                to="/loginsignup"
                state={{ initialMode: "signup" }}
              >
                Sign Up
              </Link>
              <Link
                className="flex items-center justify-center bg-[#262348] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#262348]/8 transition-colors min-w-[84px] max-w-[480px] cursor-pointer rounded-lg h-10 px-4"
                to="/loginsignup"
                state={{ initialMode: "login" }}
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
