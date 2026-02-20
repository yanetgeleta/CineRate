import env from "dotenv";
import path from "path";
import db from "../config/database.js";

env.config({ path: path.resolve(process.cwd(), ".env") });

export const updateUserLibary = async (req, res) => {
  const body = req.body;
  try {
    if (body.filmStatus === null) {
      const userLibrary = await db.query(
        `insert into user_library (user_id, tmdb_id, film_type, is_favorited)
        values ($1, $2, $3, $4)
        on CONFLICT (user_id, tmdb_id)
        do UPDATE set is_favorited=EXCLUDED.is_favorited
        returning *`,
        [body.userId, body.filmId, body.mediaType, body.isFavorite],
      );
      return userLibrary.rows[0];
    } else {
      const userLibrary = await db.query(
        `insert into user_library (user_id, tmdb_id, film_type, status)
        values ($1, $2, $3, $4)
        on CONFLICT (user_id, tmdb_id)
        do UPDATE set status=EXCLUDED.status
        returning *`,
        [body.userId, body.filmId, body.mediaType, body.filmStatus],
      );
      return userLibrary.rows[0];
    }
  } catch (err) {
    console.log(new Error("Failed to update user_library"), err.message);
    throw new Error("Failed to updated user_library");
  }
};
