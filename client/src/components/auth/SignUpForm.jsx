import React from "react";
import Button from "../Button";
import Input from "../Input";

const SignUpForm = ()=> {
    return (
        <div>
            <label htmlFor="signup-email">Email or Username
            <Input type="email" placeholder="Enter your email" id="signup-email" />
            </label>
            <label htmlFor="signup-password">Password
            <Input type="password" placeholder="Enter password" id="signup-password" />
            </label>
            <Button>Sign Up</Button>
        </div>
    )
}

export default SignUpForm;