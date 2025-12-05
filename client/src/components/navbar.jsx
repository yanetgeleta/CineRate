import React from "react";
import Brand from "./brand";
import NavLink from "./navlink";
import SearchInput from "./searchInput";
import Button from "./Button";

function Navbar() {
    return (
        <div>
            <Brand />
            <NavLink />
            <NavLink />
            <NavLink />
            <SearchInput />
            <Button name="Sign Up" />
            <Button name="Login" />
        </div>
    );
};
export default Navbar;