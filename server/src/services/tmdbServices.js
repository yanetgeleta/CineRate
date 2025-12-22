import axios from "axios";
import env from "dotenv";

env.config({path: '../.env'});
const baseURL = process.env.TMDB_BASE_URL;
const bearerToken = process.env.TMDB_ACCESS_TOKEN;
const tmdbApiKey = process.env.TMDB_API_KEY;
// fetches data from the movie database
const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}`
    }
}

export const trendingToday = await axios.get(`${baseURL}/trending/all/day`, config);
export const trendingWeekly = await axios.get(`${baseURL}/trending/all/week`, config);
export const newReleaseMovies = await axios.get(`${baseURL}/movie/now_playing`, config);
export const topRatedMovies = await axios.get(`${baseURL}/movie/top_rated`, config);
export const topRatedShows = await axios.get(`${baseURL}/tv/top_rated`, config);