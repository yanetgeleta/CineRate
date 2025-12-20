import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";
import env from "dotenv";

env.config({path: '../.env'});
const clientURL = env.process.CLIENT_URL || "http://localhost:5173";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", passport.authenticate("local"), (req,res)=> {
    res.json({user: req.user});
});

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login?error=googlefail"
}),
  (req,res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);

router.get("/logout", (req, res, next) => {
    req.logout((err)=> {
        if(err) next(err);
        res.redirect(`${clientURL}/dashboard`);
    })
})

export default router;