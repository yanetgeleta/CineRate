import React, { useState } from "react";
import MovieIcon from '@mui/icons-material/Movie';
import Button from "../components/Button";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
// This is where users login and signup
function LoginSignUp() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [mode, setMode] = useState(state?.initialMode || "login")

    const handleLogIn = ()=> {
        setMode("login")
    }
    const handleSignUp = ()=> {
        setMode("signup")
    }
    const handleGoogleLogin = ()=> {
        window.location.href = 'api/auth/google';
    }

    const handleAuthenticationSuccess = ()=> {
        navigate('/');
    }

    return (
            <div>
                <img src="https://placehold.co/100x150" alt="background picture" />
                <span><MovieIcon /><h2>CineRate</h2></span>
                <h2>Your cinematic journey starts here</h2>
                <p>Login in or create account to start rating and reviewing films.</p>
                <Button onClick={handleLogIn}>Login</Button>
                <Button onClick={handleSignUp}>Sign up</Button>
                {mode === 'login'? (
                    <LoginForm onSuccess={handleAuthenticationSuccess} />
                ) : (
                    <SignUpForm onSuccess={handleAuthenticationSuccess} />)}
                <p>Or continue with</p>
                <Button onClick={handleGoogleLogin} ><GoogleIcon /></Button>
            </div>
    )
}
export default LoginSignUp;