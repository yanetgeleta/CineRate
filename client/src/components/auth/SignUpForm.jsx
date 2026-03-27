import React from "react";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpForm = (props) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fName, lName, password, username, email }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Sign up failed");
      }

      const data = await response.json();
      console.log("Register succes", data);

      login(data.user);
      navigate("/dashboard");
      if (props.onSuccess) {
        props.onSuccess();
      }
    } catch (err) {
      console.log("Registration form error", err);
    }
  };
  // const formData = [
  //   { for: "signup-fname", text: "First Name", inputType: "text" },
  // ];

  return (
    <div>
      <form className="flex flex-col gap-4 px-4" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col flex-1" htmlFor="signup-fname">
            <p className="text-sm font-medium leading-normal pb-2">
              First Name
            </p>
            <input
              type="text"
              placeholder="Enter your first name"
              id="signup-fname"
              value={fName}
              onChange={(e) => {
                setFName(e.target.value);
              }}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
            />
          </label>
          <label className="flex flex-col flex-1" htmlFor="signup-lname">
            <p className="text-sm font-medium leading-normal pb-2">Last Name</p>
            <input
              type="text"
              placeholder="Enter your last name"
              id="signup-lname"
              value={lName}
              onChange={(e) => {
                setLName(e.target.value);
              }}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
            />
          </label>
        </div>
        <div className="flex justify-between gap-4">
          <label className="flex flex-col flex-1" htmlFor="signup-username">
            <p className="text-sm font-medium leading-normal pb-2">Username</p>
            <input
              type="text"
              placeholder="Enter your username"
              id="signup-username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
            />
          </label>
          {/* Usernames are unique and you have to implement the checking process where you check through the database before submitting */}
          <label className="flex flex-col flex-1" htmlFor="signup-email">
            <p className="text-sm font-medium leading-normal pb-2">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              id="signup-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
            />
          </label>
        </div>
        <label className="flex flex-col flex-1" htmlFor="signup-password">
          <p className="text-sm font-medium leading-normal pb-2">Password</p>
          <input
            type="password"
            placeholder="Enter password"
            id="signup-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-700 bg-[#262348] focus:border-primary/50 h-12 placeholder:text-[#9692c9] p-3 text-base font-normal leading-normal"
          />
        </label>
        <button
          className="cursor-pointer flex items-center justify-center rounded-lg bg-blue-400 h-12 px-4 text-base text-white font-medium mt-4 hover:bg-blue-400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121022] focus:ring-blue-400 transition-colors"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
