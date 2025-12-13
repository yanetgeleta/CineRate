import React from "react";
import Brand from "../components/Brand";
import NavLink from "../components/NavLink";
import Button from "../components/Button";
import ProfilePic from "../components/ProfilePic";
import NotificationRing from "../components/NotificationRing";
import Input from "../components/Input";

function Navbar() {
    return (
        <div>
            <Brand />
            <NavLink path="/movies" name="Movies" />
            <NavLink path="/tvShows" name="TV Shows" />
            <NavLink path="/genres" name="Genres" />
            <Input />
            <NotificationRing />
            <ProfilePic />
            <Button>Sign Up</Button>
            <Button>Log In</Button>
        </div>
    );
};
export default Navbar;