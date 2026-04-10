import bcrypt from "bcrypt";
import db from "../config/database.js";
import env from "dotenv";
import path from "path";
import User from "../models/userModel.js";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { tokenCreator } from "../services/jwtService.js";

env.config({ path: path.resolve(process.cwd(), ".env") });

export const registerUser = async (req, res) => {
  const { fName, lName, password, username, email } = req.body;
  const profilePic = createAvatar(adventurer, {
    seed: `${fName} ${lName}`,
    size: 100,
    radius: 50,
  });
  const profilePicUrl = profilePic.toDataUri();
  try {
    const existingUser = await User.byEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const profilePic = createAvatar(adventurer, {
      seed: `${fName} ${lName}`,
      size: 100,
      radius: 50,
    });
    const profilePicUrl = profilePic.toDataUri();
    const displayName = `${fName} ${lName}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.newUserLocal(
      email,
      hashedPassword,
      displayName,
      profilePicUrl,
      username,
    );
    const token = tokenCreator({ user: newUser });
    return res.status(201).json({
      message: "Registration Successful",
      user: newUser,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error during registration." });
  }
};
