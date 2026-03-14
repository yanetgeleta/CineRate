import React from "react";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, login } = useAuth();
  return (
    <div>
      <NavLink to="/">CineRate</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/shows">Shows</NavLink>
      <NavLink to="/genres">Genres</NavLink>
      <Input />
      {user && (
        <>
          <NotificationRing />
          <NavLink to="/profile">
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
