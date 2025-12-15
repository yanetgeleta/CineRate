import React from "react";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";

const LoginForm = (props)=> {

    return (
        <div>
            <form>
                <label htmlFor="login-email">Email or Username
                <Input type="text" placeholder="Enter your email or username" id="login-email" />
                </label>
                <label htmlFor="login-password">Password
                <Input type="password" placeholder="Enter a password" id="login-password" />
                </label>
                <Link to="/"><Button type="submit">Login</Button></Link>
            </form>
        </div>
    )
}

export default LoginForm;