import axios from "axios";
import env from "dotenv";
import path from "path";

env.config({ path: path.resolve(process.cwd(), ".env") });
const baseURL = process.env.TMDB_BASE_URL;
const bearerToken = process.env.TMDB_ACCESS_TOKEN;
const tmdbApiKey = process.env.TMDB_API_KEY;
// fetches data from the movie database
const config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};
export const getTrendingToday = async () => {
  return await axios.get(`${baseURL}/trending/all/day`, config);
};
export const getTrendingWeekly = async () => {
  return await axios.get(`${baseURL}/trending/all/week`, config);
};
export const getNewReleaseMovies = async () => {
  return await axios.get(`${baseURL}/movie/now_playing`, config);
};
export const getTopRatedMovies = async () => {
  return await axios.get(`${baseURL}/movie/top_rated`, config);
};
export const getTopRatedShows = async () => {
  return await axios.get(`${baseURL}/tv/top_rated`, config);
};
