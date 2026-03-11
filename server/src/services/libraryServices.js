import ReviewRating from "../models/reviewRatingModel.js";
import Library from "../models/userLibraryModel.js";

// env.config({ path: path.resolve(process.cwd(), ".env") });

export const updateUserLibary = async (req, res) => {
  const body = req.body;
  const userId = req.user.id;
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
  const userId = req.user.id;
  try {
    const reviews = await ReviewRating.userReviewsData(userId);

    const ratingsArr = await ReviewRating.userRatingsData(userId);
    const ratings = ratingsArr.reduce((acc, current) => {
      acc[current.tmdb_id] = current;
      return acc;
    }, {});
    const userLibraryArr = await Library.userLibraryData(userId);
    const userLibrary = userLibraryArr.reduce((acc, current) => {
      acc[current.tmdb_id] = current;
      return acc;
    }, {});
    return {
      ratings: ratings,
      reviews: reviews,
      userStatusLibrary: userLibrary,
    };
  } catch (err) {
    console.log(err.message);
    throw new Error({
      message: "Error at all Libraray service fetching user data",
    });
  }
};
