import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import db from "./database.js";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), ".env") });

const configurePassport = () => {
  passport.use(
    "local",
    new LocalStrategy(async (username, password, cb) => {
      try {
        const existingUser = await db.query(
          `select * from users where email = $1 or username = $1`,
          [username],
        );
        if (existingUser.rows.length === 0)
          cb(null, false, { message: "Email or username not found" });
        const user = existingUser.rows[0];
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
          const result = await db.query(
            `select * from users where email = $1`,
            [profile.email],
          );
          if (result.rows.length === 0) {
            const { id, displayName, emails, photos } = profile;
            const email = emails[0]?.value;
            const photo = photos[0]?.value;
            const newUser = await db.query(
              `insert into users(email, auth_provider, google_id, display_name, profile_pic_url)
                        values($1, 'google', $2, $3, $4)
                        returning *
                `,
              [email, id, displayName, photo],
            );
            return cb(null, newUser.rows[0]);
          }
          return cb(null, result.rows[0]);
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
      const result = await db.query(
        `select (id, email, auth_provider, google_id, display_name, profile_pic_url, created_at, username) from users where id = $1`,
        [id],
      );
      result.rows.length > 0
        ? cb(null, result.rows[0])
        : cb(new Error("User not found"), null);
    } catch (err) {
      cb(err, null);
    }
  });
};

export default configurePassport;
