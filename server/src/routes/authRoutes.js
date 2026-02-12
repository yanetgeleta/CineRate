import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), ".env") });
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";
const router = express.Router();

router.post("/register", registerUser);
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "User not logged in!" });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login?error=googlefail",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.redirect(`${clientURL}/dashboard`);
  });
});

export default router;
