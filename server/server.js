import express from "express";
import path from "path";
import cors from "cors";
import passport, { Passport } from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import env from "dotenv";
import bodyParser from "body-parser";

const app = express();
const port = process.env.SERVER_PORT;
env.config();

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=> {
    res.render("index.html")
})

app.post("/register", async (req, res)=> {
     
})
app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}))

app.post("/auth/google", passport.authenticate("googel", {
    scope: ["profile", "email"]
}))
app.get("/auth/google", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
}))


app.listen(port, ()=> console.log("Server is running on", port));