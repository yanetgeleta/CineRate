import React from "react";
import Button from "../Button";
import Input from "../Input";

const LoginForm = ()=> {
    return (
        <div>
            <label htmlFor="login-email">Email or Username
            <Input type="text" placeholder="Enter your email or username" id="login-email" />
            </label>
            <label htmlFor="login-password">Password
            <Input type="password" placeholder="Enter a password" id="login-password" />
            </label>
            <Button>Login</Button>
    </div>
    )
}

export default LoginForm;