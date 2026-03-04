import env from "dotenv";
import path from "path";
import db from "../config/database.js";
import passport from "passport";
import Library from "../models/userLibraryModel.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

// env.config({ path: path.resolve(process.cwd(), ".env") });

export const updateUserLibary = async (req, res) => {
  const body = req.body;
  const userRow = req.user.row;
  const userId = userRow.replace("(", "").split(",")[0];
  try {
    // so it works with postman (postman sends true as "true" which are strings)
    if (body.filmStatus === "true") body.filmStatus = true;
    if (body.filmStatus === "false") body.filmStatus = false;

    if (typeof body.filmStatus === "boolean") {
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
    throw new Error(
      "Failed to updated user_library with status and/or favorites",
    );
  }
};
export const allLibrary = async (req) => {
  const userRow = req.user.row;
  const userId = userRow.replace("(", "").split(",")[0];
  try {
    const ratings = await Library.userRatingsData(userId);
    const reviews = await Library.userReviewsData(userId);
    const userLibrary = await Library.userLibraryData(userId);
    return {
      data: { ratings: ratings, reviews: reviews, userLibrary: userLibrary },
    };
  } catch (err) {
    console.log(err.message);
    throw new Error({
      message: "Error at all Libraray service fetching user data",
    });
  }
};
export const allFilmReviews = async (req) => {
  try {
    const filmId = req.filmId;
    const filmReviewsData = await Library.filmReviewsData(filmId);
    return filmReviewsData;
  } catch (err) {
    console.log(err.message);
    throw new Error({
      message:
        "Error at all films reviews service fetching reviews data from model ",
    });
  }
};
