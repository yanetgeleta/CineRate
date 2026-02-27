import bcrypt from "bcrypt";
import db from "../config/database.js";
import env from "dotenv";
import path from "path";
import User from "../models/userModel.js";

env.config({ path: path.resolve(process.cwd(), ".env") });
const profilePlaceholder = process.env.PROFILE_PLACEHOLDER;

export const registerUser = async (req, res) => {
  const { fName, lName, password, username, email } = req.body;
  try {
    const existingUser = await User.byEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const displayName = `${fName} ${lName}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.newUserLocal(
      email,
      hashedPassword,
      displayName,
      profilePlaceholder,
      username,
    );
    req.login(newUser, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Login failed after registration." });
      return res.status(201).json({
        message: "Registration successful",
        user: newUser,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error during registration." });
  }
};
