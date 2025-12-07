import React from "react";
import Brand from "./Brand";
import NavLink from "./NavLink";
import SearchInput from "./SearchInput";
import Button from "./Button";
import ProfilePic from "./ProfilePic";
import NotificationRing from "./NotificationRing";

function Navbar() {
    return (
        <div>
            <Brand />
            <NavLink path="/movies" name="Movies" />
            <NavLink path="/tvShows" name="TV Shows" />
            <NavLink path="/genres" name="Genres" />
            <SearchInput />
            <NotificationRing />
            <ProfilePic />
            <Button name="Sign Up" />
            <Button name="Login" />
        </div>
    );
};
export default Navbar;