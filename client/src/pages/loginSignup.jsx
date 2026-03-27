import React, { useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import Button from "../components/Button";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
// This is where users login and signup
function LoginSignUp() {
  const navigate = useNavigate();
  // const location = useLocation();
  // Use this location to find where the request for authentication came from and redirect them there
  const { state } = useLocation();
  const [mode, setMode] = useState(state?.initialMode || "login");

  const handleLogIn = () => {
    setMode("login");
  };
  const handleSignUp = () => {
    setMode("signup");
  };
  const handleGoogleLogin = () => {
    window.location.href = "api/auth/google";
  };

  const handleAuthenticationSuccess = () => {
    navigate("/");
  };

  return (
    <section className="mt-20">
      <img src="../wall-poster.jpg" alt="background picture" />
      <span>
        <MovieIcon />
        <h2>CineRate</h2>
      </span>
      <h2>Your cinematic journey starts here</h2>
      <p>Login in or create account to start rating and reviewing films.</p>
      <button onClick={handleLogIn}>Login</button>
      <button onClick={handleSignUp}>Sign up</button>
      {mode === "login" ? (
        <LoginForm onSuccess={handleAuthenticationSuccess} />
      ) : (
        <SignUpForm onSuccess={handleAuthenticationSuccess} />
      )}
      <p>Or continue with</p>
      <IconButton onClick={handleGoogleLogin}>
        <GoogleIcon />
      </IconButton>
    </section>
  );
}
export default LoginSignUp;
