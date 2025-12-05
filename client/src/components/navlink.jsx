import React from "react";
import { Link } from "react-router-dom";

function NavLink(props) {
    return (
        <Link to={props.path} >{props.name}</Link>
    )
}
export default NavLink;