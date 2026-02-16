import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
// This is the page that shows details of a specific movie when clicked on
function MovieDetail() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
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
        const data = await response.json();
        setMovieData(data);
      } catch (err) {
        console.log(
          new Error("Error trying to fetch for movie detail"),
          err.message,
        );
      } finally {
        setLoading(false);
      }
    };
  });
  return (
    <div>
      <Navbar />
      <FilmCard /> {/* the big background */}
      <FilmCard /> {/* the smaller card */}
      <h2>Title</h2>
      <p>Rating</p>
      <p>Release/on air date</p>
      <Button>Action</Button> {/* loops the genre for the movie */}
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
      {/* Each button will render its respective information */}
    </div>
  );
}
export default MovieDetail;
