import ReviewRating from "../models/reviewRatingModel.js";
import Library from "../models/userLibraryModel.js";

// we need: filmId, filmType, rating(if), review(if)
// to add review to the database
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
    throw new Error("Couldn't add review to the database");
  }
};
// to update review that was existing on the database
export const updateReview = async (req, res) => {
  try {
    const { reviewId, newReview } = req.body;
    const reviewRow = await ReviewRating.updateReview(reviewId, newReview);
    return reviewRow;
  } catch (err) {
    console.log(err.message);
    throw new Error("Couldn't update the database with new review");
  }
};
// to make a new rating or update and exisiting one
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
// get all the comments made to a single movie by user
export const getFilmReviewByUser = async (req) => {
  try {
    const { filmId } = req.body;
    const userRow = req.user.row;
    const userId = userRow.replace("(", "").split(",")[0];
    const reviews = await ReviewRating.userFilmReview(filmId, userId);
    return reviews;
  } catch (err) {
    throw new Error("Error get user film reviews from the databse");
  }
};
// gets all the comments made to a single film
export const allFilmReviews = async (req) => {
  try {
    const filmId = req.query.filmId;
    const filmReviewsData = await ReviewRating.filmReviewsData(filmId);
    return filmReviewsData;
  } catch (err) {
    console.log(err.message);
    throw new Error({
      message:
        "Error at all films reviews service fetching reviews data from model ",
    });
  }
};
