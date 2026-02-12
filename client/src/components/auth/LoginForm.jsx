import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login Success", data);

      login(data.user);
      props.onSuccess();
    } catch (err) {
      console.error("Error during login", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">
          Email or Username
          <Input
            type="text"
            placeholder="Enter your email or username"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="login-password">
          Password
          <Input
            type="password"
            placeholder="Enter a password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
