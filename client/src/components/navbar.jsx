import React from "react";
import Brand from "./Brand";
import NavLink from "./NavLink";
import Button from "./Button";
import ProfilePic from "./ProfilePic";
import NotificationRing from "./NotificationRing";
import Input from "./Input";

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