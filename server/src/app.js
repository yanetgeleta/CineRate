import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import env from "dotenv";

import configurePassport from "./config/passport";
import authRoutes from "./routes/authRoutes";

env.config();

const app = express();

configurePassport();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7, secure: false}
    })
)

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/", authRoutes);
app.get("/", (req, res) => {
    res.send("Api is running correctly.");
})

export default app;