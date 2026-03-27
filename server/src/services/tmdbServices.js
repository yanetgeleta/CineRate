import axios from "axios";
import env from "dotenv";
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
  const response = await axios.get(`${baseURL}/trending/all/day`, config);
  const data = response.data.results.filter((item) => {
    return item.media_type !== "person";
  });
  // console.log({ data: data });
  return { data: data };
};
export const getTrendingWeekly = async () => {
  const response = await axios.get(`${baseURL}/trending/all/week`, config);
  const data = response.data.results.filter((item) => {
    return item.media_type !== "person";
  });
  return { data: data };
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
  const { genreIdValue, yearValue, sortByValue, filmType } = req.query;
  if (genreIdValue) {
    paramValues.with_genres = genreIdValue;
  }
  if (yearValue) {
    paramValues.year = yearValue;
  }
  if (sortByValue) {
    // const order =
    //   req.query.sortByValue === "title" || "original_title" ? "desc" : "asc";
    paramValues.sort_by = sortByValue;
  }

  const params = new URLSearchParams(paramValues);
  const filmTypeName = filmType;
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
export const filmDetailGetter = async (req, res) => {
  const id = req.query.filmId;
  const type = req.query.filmType;
  // https://api.themoviedb.org/3/movie/{movie_id}
  const path = `${baseURL}/${type}/${id}?append_to_response=credits`;
  try {
    const response = await axios.get(path, config);
    return { data: { filmData: response.data } };
  } catch (err) {
    console.log(new Error(`Couldn't fetch details for ${id}`, err.message));
  }
};
// search for movies and shows
export const multiSearch = async (req) => {
  try {
    const { query, page } = req.query;
    const params = new URLSearchParams(req.query);
    const path = `${baseURL}/search/multi?${params}`;
    const searchRes = await axios.get(path, config);
    return searchRes;
    // return { data: { searchResult: searchRes.data } };
  } catch (err) {
    throw new Error("Error searching at service");
  }
};
