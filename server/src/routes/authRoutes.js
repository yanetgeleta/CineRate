import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";
import env from "dotenv";
import path from "path";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

env.config({ path: path.resolve(process.cwd(), ".env") });
const router = express.Router();

router.post("/register", registerUser);
router.get("/user", ensureAuthenticated, (req, res) => {
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
    failureRedirect: `${process.env.CLIENT_URL}/login?error=googlefail`,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  });
});

export default router;
