import React from "react";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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
    <div>
      <NavLink to="/">CineRate</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/shows">Shows</NavLink>
      <NavLink to="/genres">Genres</NavLink>
      {pathname !== "/search" && (
        <form onSubmit={handleSearch}>
          <input
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
        <>
          <NotificationRing />
          <NavLink to={`/profile/${user.id}`}>
            <ProfilePic />
          </NavLink>
          <Button
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Button>
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
  );
}
export default Navbar;
