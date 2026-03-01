import ReviewRating from "../models/reviewRatingModel.js";
import Library from "../models/userLibraryModel.js";

// we need: filmId, filmType, rating(if), review(if)
export const addReviews = async (req, res) => {
  try {
    const { filmId, filmType, review } = req.body;
    const userRow = req.user.row;
    const userId = userRow.replace("(", "").split(",")[0];
    const reviewRow = await ReviewRating.addReview(
      userId,
      filmId,
      filmType,
      review,
    );
    // If a person wrote a review, it means they have watched the film
    await Library.updateFilmStatus(userId, filmId, filmType, "watched");
    // we get only the relevant data from the model
    return reviewRow;
  } catch (err) {
    console.log(err.message);
    throw new Error("Couldn't add error to the database");
  }
};
export const updateRating = async (req, res) => {
  const { filmId, filmType, rating } = req.body;
  const userRow = req.user.row;
  const userId = userRow.replace("(", "").split(",")[0];
  const ratingRow = await ReviewRating.addUpdateRating(
    userId,
    filmId,
    filmType,
    rating,
  );
  // If a person rated a film, it means they have watched the film
  await Library.updateFilmStatus(userId, filmId, filmType, "watched");
  // we get the relevant data from the model
  return ratingRow;
};
