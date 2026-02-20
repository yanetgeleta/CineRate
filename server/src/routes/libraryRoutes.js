import express from "express";
import { updateUserLibary } from "../services/libraryServices.js";

const router = express.Router();

router.post("/update/film/status", async (req, res) => {
  try {
    const libaryRes = await updateUserLibary(req);
    res.json(libaryRes);
  } catch (err) {
    throw new Error("Error at the library route trying to call service");
  }
});
export default router;
