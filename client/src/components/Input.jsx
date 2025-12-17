import React from "react";

function Input(props) {
    // type="text" placeholder="Enter your email or username" id="login-email" value={email}
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            id={props.id}
            value={props.email} 
            onChange={props.onChange}
        />
    )
}
export default Input;