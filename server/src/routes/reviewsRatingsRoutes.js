import express from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import { addReviews, updateRating } from "../services/reviewsRatingServices.js";

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
router.post("/update/rating", ensureAuthenticated, async (req, res) => {
  try {
    const userRating = await updateRating(req);
    res.json(userRating);
  } catch (err) {
    console.error(err.message);
  }
});
export default router;
