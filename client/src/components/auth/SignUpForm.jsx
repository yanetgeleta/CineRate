import React from "react";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";

const SignUpForm = ()=> {
    return (
        <div>
            <label htmlFor="signup-fname">
                <Input type="text" placeholder="Enter your first name" id="signup-fname" />
            </label>
            <label htmlFor="signup-lname">
                <Input type="text" placeholder="Enter your last name" id="signup-lname" />
            </label>
            <label htmlFor="signup-username">
                <Input type="text" placeholder="Enter your username" id="signup-username" />
            </label>
            {/* Usernames are unique and you have to implement the checking process where you check through the database before submitting */}
            <label htmlFor="signup-email">Email or Username
                <Input type="email" placeholder="Enter your email" id="signup-email" />
            </label>
            <label htmlFor="signup-password">Password
                <Input type="password" placeholder="Enter password" id="signup-password" />
            </label>
            <Link to="/"><Button>Sign Up</Button></Link>
        </div>
    )
}

export default SignUpForm;