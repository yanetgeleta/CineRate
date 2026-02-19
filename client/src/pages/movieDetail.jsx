import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import MovieDetailsComp from "../components/FilmDetailsComp";
import FilmDetailsComp from "../components/FilmDetailsComp";
// This is the page that shows details of a specific movie when clicked on
function MovieDetail() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const [movieGenres, setMovieGenres] = useState(null);
  //   These are two arrays

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const queryObj = { filmId: movieId, filmType: "movie" };
        const params = new URLSearchParams(queryObj);
        const response = await fetch(`/api/tmdb/film/detail?${params}`);
        if (!response.ok) {
          console.log(new Error("Failed to fetch movie detail"));
          setLoading(false);
        }
        const json = await response.json();
        const data = await json.filmData;
        setMovieData(data);
        setMovieGenres(data.genres);
      } catch (err) {
        console.log(
          new Error("Error trying to fetch for movie detail"),
          err.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [movieId]);
  return (
    <div>
      <Navbar />
      {loading ? (
        <ClipLoader
          loading={loading}
          aria-label="Loading Movies Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          {" "}
          <FilmCard
            src={`${basePosterPath}${heroBannerWidth}${movieData.backdrop_path}`}
          />{" "}
          {/* the big background */}
          <FilmCard
            src={`${basePosterPath}${smallBannerWidth}${movieData.poster_path}`}
          />{" "}
          {/* the smaller card */}
          <h2>{movieData.title || movieData.name}</h2>
          <p>{movieData.vote_average}</p>
          {/* Will be replace by my own rating */}
          <p>{movieData.release_date}</p>
          {movieGenres.map((genre, index) => (
            <Button key={index}>{genre.name}</Button>
          ))}
          <Button>
            <BookmarkAddIcon /> Add To Watchlist
          </Button>
          <Button>
            <StarIcon /> Rate
          </Button>
          <Button>
            <CreateIcon /> Write a Review
          </Button>
          <Button>Details</Button>
          <Button>Cast & Crew</Button>
          <Button>Reviews</Button>
          <FilmDetailsComp filmData={movieData} />
        </div>
      )}
    </div>
  );
}
export default MovieDetail;
