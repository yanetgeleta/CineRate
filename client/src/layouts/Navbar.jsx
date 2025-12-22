import React from "react";
import Brand from "../components/Brand";
import NavLink from "../components/NavLink";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <Brand />
            <NavLink path="/movies" name="Movies" />
            <NavLink path="/shows" name="TV Shows" />
            <NavLink path="/genres" name="Genres" />
            <Input />
            <NotificationRing />
            <ProfilePic />
            <Link to="/loginsignup" state={{initialMode: "signup"}} ><Button>Sign Up</Button></Link>
            <Link to="/loginsignup" state={{initialMode: "login"}} ><Button>Log In</Button></Link>
        </div>
    );
};
export default Navbar;