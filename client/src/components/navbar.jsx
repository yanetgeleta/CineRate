import React from "react";
import Brand from "./Brand";
import NavLink from "./Navlink";
import SearchInput from "./SearchInput";
import Button from "./Button";

function Navbar() {
    return (
        <div>
            <Brand />
            <NavLink path="/movies" name="Movies" />
            <NavLink path="/tvShows" name="TV Shows" />
            <NavLink path="/genres" name="Genres" />
            <SearchInput />
            <Button name="Sign Up" />
            <Button name="Login" />
        </div>
    );
};
export default Navbar;