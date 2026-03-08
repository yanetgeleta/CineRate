import express from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import {
  addReviews,
  getFilmReviewByUser,
  updateRating,
  updateReview,
} from "../services/reviewsRatingServices.js";
import { allFilmReviews } from "../services/libraryServices.js";

const router = express.Router();

router.post("/add/review", ensureAuthenticated, async (req, res) => {
  try {
    const userReview = await addReviews(req);
    res.json(userReview);
  } catch (err) {
    console.error(err.message);
    throw new Error("Error at route trying to add a review for user");
  }
});
router.post("/update/review", ensureAuthenticated, async (req, res) => {
  try {
    const userReview = await updateReview(req);
    res.json(userReview);
  } catch (err) {
    console.error(err.message);
    throw new Error("Error at route trying to update review for user");
  }
});
router.post("/update/rating", ensureAuthenticated, async (req, res) => {
  try {
    const userRating = await updateRating(req);
    res.json(userRating);
  } catch (err) {
    console.error(err.message);
    throw new Error(
      "Error at rating route trying to update rating by calling service",
    );
  }
});
// route: all reviews for a single movie
router.get("/film/reviews", ensureAuthenticated, async (req, res) => {
  try {
    const filmReviews = await allFilmReviews(req);
    res.json(filmReviews);
  } catch (err) {
    console.log(err.message);
    throw new Error("Error calling film reviews at route", err.message);
  }
});
// route to user film reviews (all comments by user to a film)
router.get("/user/film/reviews", ensureAuthenticated, async (req, res) => {
  try {
    const userFilmReviews = await getFilmReviewByUser(req);
    res.json(userFilmReviews);
  } catch (err) {
    throw new Error("Error calling film reviews at home");
  }
});
export default router;
