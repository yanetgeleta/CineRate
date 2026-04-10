import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import tmdbRoute from "./routes/tmdbRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import reviewsRoutes from "./routes/reviewsRatingsRoutes.js";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), ".env") });

import configurePassport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.set("trust proxy", 1);
// const PgStore = pgSession(session);
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // This will be your Vercel URL
].filter(Boolean); // Removes undefined values if CLIENT_URL isn't set yet

configurePassport();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy blocked this origin"), false);
      }
      return callback(null, true);
    },
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
