import React from "react";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Menu as MenuIcon, X } from "lucide-react";

function Navbar() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1326] backdrop-blur-xl bg-opacity-60 shadow-2xl shadow-blue-500/5 h-20">
      <div className="flex justify-between items-center px-8 py-4 max-w-480 mx-auto font-['Inter'] tracking-tight antialiased">
        {/* Home, movies, Shows (Desktop version) */}
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
                className="bg-[#060e20] border-none rounded-xl pl-10 pr-4 py-2 text-sm w-40 md:w-60e focus:ring-2 focus:ring-[#adc6ff] transition-all duration-200"
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
            <div className="md:flex gap-1.5 items-center justify-center hidden">
              {/* <NotificationRing /> */}
              <button
                className="hidden md:flex items-center justify-center bg-[#262348] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#262348]/8 transition-colors min-w-21 max-w-120 cursor-pointer rounded-lg h-10 px-4 active:scale-95"
                onClick={async () => {
                  await logout();
                  // location.reload();
                  // No need for the reload, authcontext from user handling already
                }}
              >
                Log out
              </button>
              <NavLink className="hidden md:block" to={`/profile/${user.id}`}>
                <span>
                  <ProfilePic imgClass="size-15 flex items-center justify-center rounded-full hover:scale-105 transition-all active:scale-95" />
                </span>
              </NavLink>
            </div>
          )}

          {!user && pathname !== "/loginsignup" && (
            <div className="hidden md:flex gap-2">
              <Link
                className="flex items-center justify-center bg-blue-400 text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-blue-400/90 transition-colors min-w-21 max-w-120 cursor-pointer rounded-lg h-10 px-4"
                to="/loginsignup"
                state={{ initialMode: "signup" }}
              >
                Sign Up
              </Link>
              <Link
                className="flex items-center justify-center bg-[#262348] text-white text-lg font-bold leading-normal tracking-[0.015em] hover:bg-[#262348]/8 transition-colors min-w-21 max-w-120 cursor-pointer rounded-lg h-10 px-4"
                to="/loginsignup"
                state={{ initialMode: "login" }}
              >
                Log In
              </Link>
            </div>
          )}
          <button onClick={toggleMenu} className="md:hidden p-2 text-[#ADC6FF]">
            <MenuIcon size={28} />
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {/* PLACE THIS AT THE VERY END OF YOUR NAVBAR COMPONENT, JUST BEFORE THE LAST </nav> TAG */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop: inset-0 makes it cover the entire browser window */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={toggleMenu}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 w-72 h-screen bg-[#0B1326] border-l border-white/10 p-8 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-slate-400"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col gap-8 mt-12">
            {user ? (
              <>
                <Link
                  to={`/profile/${user?.id}`}
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Profile
                </Link>
                <Link
                  to="/movies"
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Movies
                </Link>
                <Link
                  to="/shows"
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Shows
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="text-left text-xl font-semibold text-rose-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/loginsignup"
                  state={{ initialMode: "login" }}
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/loginsignup"
                  state={{ initialMode: "signup" }}
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Sign Up
                </Link>
                <Link
                  to="/movies"
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Movies
                </Link>
                <Link
                  to="/shows"
                  onClick={toggleMenu}
                  className="text-xl font-semibold"
                >
                  Shows
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
