import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import env from "dotenv";
import path from "path";
import User from "../models/userModel.js";

env.config({ path: path.resolve(process.cwd(), ".env") });

const configurePassport = () => {
  passport.use(
    "local",
    new LocalStrategy(async (username, password, cb) => {
      try {
        const existingUser = await User.byEmailUsername(username);
        if (!existingUser)
          cb(null, false, { message: "Email or username not found" });
        const user = existingUser;
        bcrypt.compare(password, user.password_hash, (err, valid) => {
          if (err) return cb(err);
          if (!valid)
            return cb(null, false, { message: "Incorrect password." });
          return cb(null, user);
        });
      } catch (err) {
        return cb(err);
      }
    }),
  );
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.byEmail(profile.email);
          if (!user) {
            const { id, displayName, emails, photos } = profile;
            const email = emails[0]?.value;
            const photo = photos[0]?.value;
            const newUser = await User.newUserGoogle(
              email,
              id,
              displayName,
              photo,
            );
            return cb(null, newUser);
          }
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      },
    ),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.byId(id);
      user ? cb(null, user) : cb(new Error("User not found"), null);
    } catch (err) {
      cb(err, null);
    }
  });
};

export default configurePassport;
