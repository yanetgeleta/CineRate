import env from "dotenv";
import path from "path";
import db from "../config/database.js";
import passport from "passport";

// env.config({ path: path.resolve(process.cwd(), ".env") });

export const updateUserLibary = async (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    throw new Error("User is not authenticated");
  }
  const body = req.body;
  const userRow = req.user.row;
  const userId = userRow.replace("(", "").split(",")[0];
  try {
    if (body.filmStatus === true || body.filmStatus === false) {
      const userLibrary = await db.query(
        `insert into user_library (user_id, tmdb_id, film_type, is_favorited)
        values ($1, $2, $3, $4)
        on CONFLICT (user_id, tmdb_id)
        do UPDATE set is_favorited=EXCLUDED.is_favorited
        returning *`,
        [userId, body.filmId, body.mediaType, body.filmStatus],
      );
      return userLibrary.rows[0];
    } else {
      const userLibrary = await db.query(
        `insert into user_library (user_id, tmdb_id, film_type, status)
        values ($1, $2, $3, $4)
        on CONFLICT (user_id, tmdb_id)
        do UPDATE set status=EXCLUDED.status
        returning *`,
        [userId, body.filmId, body.mediaType, body.filmStatus],
      );
      return userLibrary.rows[0];
    }
  } catch (err) {
    console.log(new Error("Failed to update user_library"), err.message);
    throw new Error("Failed to updated user_library");
  }
};
