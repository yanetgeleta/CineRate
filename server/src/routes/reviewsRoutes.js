import express from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/add/review", ensureAuthenticated, async (req, res) => {
  try {
    // const userReview =
  } catch (errr) {}
});
router.post("update/rating", ensureAuthenticated, async (req, res) => {});
