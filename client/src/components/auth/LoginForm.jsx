import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  const redirectTo = location.state || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = { username, password };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // console.log("Login Success", data);

      login(data.user);
      props.onSuccess(redirectTo);
    } catch (err) {
      console.error("Error during login", err);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
        <label htmlFor="login-email" className="flex flex-col flex-1">
          <p className="text-sm font-medium leading-normal pb-2">
            Email or Username
          </p>
          <input
            type="text"
            placeholder="Enter your email or username"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
          />
        </label>
        <label htmlFor="login-password" className="flex flex-col flex-1">
          <p className="text-sm font-medium leading-normal pb-2">Password</p>
          <input
            type="password"
            placeholder="Enter a password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
          />
        </label>
        <button
          className="cursor-pointer flex items-center justify-center rounded-lg bg-blue-400 h-12 px-4 text-base text-white font-medium mt-4 hover:bg-blue-400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121022] focus:ring-blue-400 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
