import express from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import { allLibrary, updateUserLibary } from "../services/libraryServices.js";

const router = express.Router();
// updates the status of a film for a user
router.post("/update/film/status", ensureAuthenticated, async (req, res) => {
  try {
    const libaryRes = await updateUserLibary(req);
    res.json(libaryRes);
  } catch (err) {
    console.log(err.message);
    throw new Error("Error at the library route trying to call service");
  }
});
// get all the ratings, reviews and status updates made by the user
router.get("/all", ensureAuthenticated, async (req, res) => {
  try {
    const libraryRes = await allLibrary(req);
    res.json(libraryRes);
  } catch (err) {
    console.log("error at /all route calling service", err.message);
    throw new Error({ message: "Error at /all route calling service" });
  }
});
export default router;
