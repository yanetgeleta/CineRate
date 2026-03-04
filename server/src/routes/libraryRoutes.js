import express from "express";
import { updateUserLibary } from "../services/libraryServices.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/update/film/status", ensureAuthenticated, async (req, res) => {
  try {
    const libaryRes = await updateUserLibary(req);
    res.json(libaryRes);
  } catch (err) {
    console.log(err.message);
    throw new Error("Error at the library route trying to call service");
  }
});
export default router;
