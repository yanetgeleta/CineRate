import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import tmdbRoute from "./routes/tmdbRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import reviewsRoutes from "./routes/reviewsRatingsRoutes.js";

import configurePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

configurePassport();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, secure: false },
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/tmdb", tmdbRoute);
app.use("/api/library", libraryRoutes);
app.use("/api/reviews", reviewsRoutes);
app.get("/", (req, res) => {
  res.send("Api is running correctly.");
});

export default app;
