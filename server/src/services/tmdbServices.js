import axios from "axios";
import env from "dotenv";
import { response } from "express";
import path from "path";

env.config({ path: path.resolve(process.cwd(), ".env") });
const baseURL = process.env.TMDB_BASE_URL;
const bearerToken = process.env.TMDB_ACCESS_TOKEN;
const tmdbApiKey = process.env.TMDB_API_KEY;
const youtubeVideoBase = process.env.YOUTUBE_VIDEO_BASE;
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
export const getTrailerURL = async (req, res) => {
  const filmID = req.query.filmId;
  const filmType = req.query.filmType;
  const videosPath = `${baseURL}/${filmType}/${filmID}/videos`;
  try {
    const response = await axios.get(videosPath, config);
    const trailerItem = response.data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube",
    );
    if (!trailerItem) {
      return { data: { TrailerURL: null } };
    }
    return {
      data: {
        TrailerURL: `${youtubeVideoBase}${trailerItem.key}`,
      },
    };
  } catch (err) {
    console.log(err.message);
    return { data: { TrailerURL: null } };
  }
  // return { TrailerURL: `https://www.youtube.com/watch?v=${trailerItem.key}` };
};
export const discoverFilm = async (req, res) => {
  // converts the query values from the frontend to object for params
  const paramValues = { page: req.query.pageValue };
  // function paramsAdder(queryPath, queryName) {
  //   if (queryPath) {
  //     paramValues.queryName = queryPath;
  //   }
  // }
  if (req.query.genreIdValue) {
    paramValues.with_genres = req.query.genreIdValue;
  }
  if (req.query.yearValue) {
    paramValues.year = req.query.yearValue;
  }
  if (req.query.sortByValue) {
    const order =
      req.query.sortByValue === "title" || "original_title" ? "desc" : "asc";
    paramValues.sort_by = `${req.query.sortByValue}.${order}`;
  }

  const params = new URLSearchParams(paramValues);
  const filmTypeName = req.query.filmType;
  const path = `${baseURL}/discover/${filmTypeName}?${params}`;
  try {
    const response = await axios.get(path, config);
    return response;
  } catch (err) {
    console.error(new Error("Couldn't fetch from discover movies"), err);
  }
  return;
};
export const genreIdGetter = async (req, res) => {
  const filmTypeName = req.query.filmType;
  const genreName = req.query.genre;
  const path = `${baseURL}/genre/${filmTypeName}/list`;
  if (!genreName) {
    return null;
  }
  try {
    const response = await axios.get(path, config);
    const genreValue = response.data.genres.find((genre) => {
      return genre.name.toLowerCase() === genreName.toLowerCase();
    });
    return { data: { genreId: genreValue.id } };
  } catch (err) {
    console.error(new Error(`Couldn't fetch the genre list for ${movieType}`));
  }
};
