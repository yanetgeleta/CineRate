import ReviewRating from "../models/reviewRatingModel";

// we need: filmId, filmType, rating(if), review(if)
export const updateReviews = async (req, res) => {
  const { filmId, filmType, review } = req.body;
  const userId = userRow.replace("(", "").split(",")[0];
  const reviewRow = await ReviewRating.addReview(
    userId,
    filmId,
    filmType,
    review,
  );
  return reviewRow;
};
export const updateRating = async (req, res) => {
  const { filmId, filmType, rating } = req.body;
  const userId = userRow.replace("(", "").split(",")[0];
  const ratingRow = await ReviewRating.addUpdateRating(
    userId,
    filmId,
    filmType,
    rating,
  );
  return ratingRow;
};
