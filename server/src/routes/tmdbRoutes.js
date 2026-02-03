import express from "express";
import {
  getTopRatedMovies,
  getNewReleaseMovies,
  getTopRatedShows,
  getTrendingToday,
  getTrendingWeekly,
  getTrailerURL,
} from "../services/tmdbServices.js";

const router = express.Router();
const routerFunction = (path, importFunction, errorMessage) => {
  router.get(path, async (req, res) => {
    try {
      const tmdbRes = await importFunction(req);
      // console.log(res);
      const data = await tmdbRes.data;
      // console.log(data);
      res.json(data);
    } catch (err) {
      console.log("TMDB api error", err.message);
      res.status(500).json({ error: errorMessage });
    }
  });
};

routerFunction(
  "/trending/today",
  getTrendingToday,
  "Failed to fetch trending movies and shows daily",
);
routerFunction(
  "/trending/weekly",
  getTrendingWeekly,
  "Failed to fetch trending movies and shows weekly",
);
routerFunction(
  "/new/movies",
  getNewReleaseMovies,
  "Failed to fetch new released movies",
);
routerFunction(
  "/top/movies",
  getTopRatedMovies,
  "Failed to fetch top rated movies",
);
routerFunction(
  "/top/shows",
  getTopRatedShows,
  "Failed to fetch top rateds shows",
);
routerFunction(
  "/trailer",
  getTrailerURL,
  "Failed to fetch trailer for the movie",
);
export default router;
