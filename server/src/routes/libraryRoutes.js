import express from "express";
import { allLibrary, updateUserLibary } from "../services/libraryServices.js";
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
