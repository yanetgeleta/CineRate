import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authcontroller";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", passport.authenticate("local", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login?error=authfailed"
}));

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

router.get("/logout", (req, res) => {
    req.logout((err)=> {
        if(err) next(err);
        res.redirect("http://localhost:5173/");
    })
})

export default router;