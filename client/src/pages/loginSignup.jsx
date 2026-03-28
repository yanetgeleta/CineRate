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
    <section className="mt-20 md:mx-20">
      <div className="flex w-full flex-col md:flex-row relative">
        {/* left side image */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 max-h-[90vh] shadow-xl sticky top-20 left-0">
          <img src="../wall-poster.jpg" alt="background picture" />
        </div>
        {/* right side form */}
        <div className="flex w-full items-center justify-center p-6 md:w-1/2 lg:w-2/5">
          <div className="flex w-full max-w-md flex-col gap-8 py-10">
            <div className="flex items-center justify-center gap-3">
              <MovieIcon />
              <h2 className="text-2xl font-bold">CineRate</h2>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter">
                Your cinematic journey starts here
              </h2>
              <p className="text-base font-normal leading-normal">
                Login or create an account to start rating and reviewing films.
              </p>
            </div>
            <div className="flex px-4 py-1">
              <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#262348] p-1">
                <button
                  className={`cursor-pointer h-full grow overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-colors ${
                    mode === "login" ? "bg-[#0b1326] shadow-sm " : ""
                  }`}
                  onClick={handleLogIn}
                >
                  Login
                </button>
                <button
                  className={`cursor-pointer h-full grow overflow-hidden rounded-md px-2 text-sm font-medium leading-normal transition-colors ${
                    mode === "signup" ? "bg-[#0b1326] shadow-sm " : ""
                  }`}
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </div>
            </div>

            {mode === "login" ? (
              <LoginForm onSuccess={handleAuthenticationSuccess} />
            ) : (
              <SignUpForm onSuccess={handleAuthenticationSuccess} />
            )}
            {/* Google Login */}
            <div className="flex flex-col gap-4 px-4">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative bg-[#121022] px-2  text-smtext-gray-400">
                  Or continue with
                </div>
              </div>

              <button
                className="cursor-pointer h-11 rounded-lg border border-gray-700 bg-transparent px-3 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default LoginSignUp;
