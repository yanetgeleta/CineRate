import express from "express";
import { newReleaseMovies, topRatedMovies, topRatedShows, trendingToday, trendingWeekly } from "../services/tmdbServices.js";

const router = express.Router();
const routerFunction = (path, importFunction, errorMessage)=> {
    router.get(path, async (req, res)=> {
        try {
            const data = await importFunction();
            res.json(data);
        }
        catch(err) {
            console.log("TMDB api error", err.message);
            res.status(500).json({error: errorMessage});
        }
    })
}
routerFunction("/trending/today", trendingToday, "Failed to fetch trending movies and shows daily");
routerFunction("/trending/weekly", trendingWeekly, "Failed to fetch trending movies and shows weekly");
routerFunction("/new/movies", newReleaseMovies, "Failed to fetch new released movies");
routerFunction("/top/movies", topRatedMovies, "Failed to fetch top rated movies");
routerFunction("/top/shows", topRatedShows, "Failed to fetch top rateds shows");
export default router;  