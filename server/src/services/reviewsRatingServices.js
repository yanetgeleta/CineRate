import ReviewRating from "../models/reviewRatingModel.js";
import Library from "../models/userLibraryModel.js";

// we need: filmId, filmType, rating(if), review(if)
// to add review to the database
export const addReviews = async (req) => {
  try {
    const { filmId, filmType, review, posterPath, title } = req.body;
    const userId = req.user.id;
    const reviewRow = await ReviewRating.addReview(
      userId,
      filmId,
      filmType,
      review,
      posterPath,
      title,
    );
    // If a person wrote a review, it means they have watched the film
    await Library.updateFilmStatus(
      userId,
      filmId,
      filmType,
      "watched",
      posterPath,
      title,
    );
    // we get only the relevant data from the model
    return reviewRow;
  } catch (err) {
    console.log(err.message);
    throw new Error("Couldn't add review to the database");
  }
};
// to update review that was existing on the database
export const updateReview = async (req) => {
  try {
    const { reviewId } = req.params;
    const { reviewText } = req.body;
    const date = new Date().toISOString();
    const reviewRow = await ReviewRating.updateReview(
      reviewId,
      reviewText,
      date,
    );
    return reviewRow;
  } catch (err) {
    console.log(err.message);
    throw new Error("Couldn't update the database with new review", err);
  }
};
// to make a new rating or update and exisiting one
export const updateRating = async (req) => {
  const { filmId, filmType, rating, posterPath, title } = req.body;
  const userId = req.user.id;
  const ratingRow = await ReviewRating.addUpdateRating(
    userId,
    filmId,
    filmType,
    rating,
    posterPath,
    title,
  );
  // If a person rated a film, it means they have watched the film
  await Library.updateFilmStatus(
    userId,
    filmId,
    filmType,
    "watched",
    posterPath,
    title,
  );
  // we get the relevant data from the model
  return ratingRow;
};
// get all the comments made to a single film by user
export const getFilmReviewByUser = async (req) => {
  try {
    const { filmId } = req.query;
    const userId = req.user.id;
    const reviewsArr = await ReviewRating.userFilmReview(filmId, userId);
    return reviewsArr;
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
// deletes a review using the review id
export const deleteReview = async (req) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await ReviewRating.deleteReview(reviewId);
  } catch (err) {
    throw new Error({ message: "Error deleting review from the database" });
  }
};
