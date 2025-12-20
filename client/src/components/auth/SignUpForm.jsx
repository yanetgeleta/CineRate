import React from "react";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpForm = (props)=> {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (event)=> {
        event.preventDefault();
        console.log("Form submitted!");

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fName, lName, password, username, email}),
                credentials: 'include'
            });
            if(!response.ok) {
                throw new Error("Sign up failed");
            }

            const data = await response.json();
            console.log("Register succes", data)

            login(data.user);
            navigate('/dashboard');
            if(props.onSuccess) {
                props.onSuccess();
            }
        }
        catch(err) {
            console.log("Registration form error", err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup-fname">
                    <Input 
                        type="text" 
                        placeholder="Enter your first name" 
                        id="signup-fname" 
                        value={fName}
                        onChange={(e)=> {setFName(e.target.value)}}
                    />
                </label>
                <label htmlFor="signup-lname">
                    <Input 
                        type="text" 
                        placeholder="Enter your last name" 
                        id="signup-lname"
                        value={lName}
                        onChange={(e)=> {setLName(e.target.value)}}
                    />
                </label>
                <label htmlFor="signup-username">
                    <Input 
                        type="text" 
                        placeholder="Enter your username" 
                        id="signup-username" 
                        value={username}
                        onChange={(e)=> {setUsername(e.target.value)}}
                    />
                </label>
                {/* Usernames are unique and you have to implement the checking process where you check through the database before submitting */}
                <label htmlFor="signup-email">Email
                    <Input 
                        type="email"
                        placeholder="Enter your email" 
                        id="signup-email" 
                        value={email}
                        onChange={(e)=> {setEmail(e.target.value)}}
                    />
                </label>
                <label htmlFor="signup-password">Password
                    <Input 
                        type="password" 
                        placeholder="Enter password" 
                        id="signup-password" 
                        value={password}
                        onChange={(e)=> {setPassword(e.target.value)}}
                    />
                </label>
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;