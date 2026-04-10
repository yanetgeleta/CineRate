import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";
import env from "dotenv";
import path from "path";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import { tokenCreator } from "../services/jwtService.js";

env.config({ path: path.resolve(process.cwd(), ".env") });
const router = express.Router();

router.post("/register", registerUser);
router.get("/user", ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = tokenCreator(req);
    res.json({ user: req.user, token: token });
  },
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    { session: false },
    {
      failureRedirect: `${process.env.CLIENT_URL}/login?error=googlefail`,
    },
  ),
  (req, res) => {
    const token = tokenCreator(req);
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  },
);

router.post("/logout", (req, res, next) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
