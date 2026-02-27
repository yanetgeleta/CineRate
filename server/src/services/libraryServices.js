import env from "dotenv";
import path from "path";
import db from "../config/database.js";
import passport from "passport";
import Library from "../models/userLibraryModel.js";

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
      const userLibrary = await Library.updateFavorite(
        userId,
        body.filmId,
        body.mediaType,
        body.filmStatus,
      );
      return userLibrary;
    } else {
      const userLibrary = await Library.updateFilmStatus(
        userId,
        body.filmId,
        body.mediaType,
        body.filmStatus,
      );
      return userLibrary;
    }
  } catch (err) {
    console.log(new Error("Failed to update user_library"), err.message);
    throw new Error("Failed to updated user_library");
  }
};
