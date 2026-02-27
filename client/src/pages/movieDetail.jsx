import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FilmDetailsComp from "../components/FilmDetailsComp";
import FilmCastCrewComp from "../components/FilmCastCrewComp";
import { useAuth } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import ReviewModal from "../components/ReviewModal";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

// This is the page that shows details of a specific movie when clicked on
function MovieDetail() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const [movieGenres, setMovieGenres] = useState(null);
  const { user } = useAuth();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [isFavorited, setIsFavorited] = useState(null);

  async function statusUpdateCall(updatedStatus) {
    const body = {
      filmId: movieId,
      mediaType: "movie",
      filmStatus: updatedStatus,
    };
    const response = await fetch("/api/library/update/film/status", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

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
      <Navbar user={user} />
      {loading ? (
        <ClipLoader
          loading={loading}
          aria-label="Loading Movie Detail Spinner"
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
          {movieGenres.map((genre) => (
            <Button key={genre.id}>{genre.name}</Button>
          ))}
          <IconButton>
            <BookmarkAddOutlinedIcon
              onClick={() => {
                if (!status || status === "dropped" || status === "watched") {
                  setStatus("watchlist");
                  statusUpdateCall("watchlist");
                } else {
                  setStatus("dropped");
                  statusUpdateCall("dropped");
                }
              }}
            />{" "}
          </IconButton>
          <IconButton>
            <VisibilityOutlinedIcon
              onClick={() => {
                if (!status || status === "dropped" || status === "watchlist") {
                  setStatus("watched");
                  statusUpdateCall("watched");
                } else {
                  setStatus("dropped");
                  statusUpdateCall("dropped");
                }
              }}
            />
          </IconButton>
          <IconButton>
            <FavoriteBorderOutlinedIcon
              onClick={() => {
                if (!isFavorited) {
                  setIsFavorited(true);
                  statusUpdateCall(true);
                } else {
                  setIsFavorited(false);
                  statusUpdateCall(false);
                }
              }}
            />
          </IconButton>
          <IconButton>
            <StarIcon /> Rate
          </IconButton>
          <IconButton
            onClick={() => {
              setIsReviewOpen(true);
            }}
          >
            <CreateIcon />
          </IconButton>
          <Button>Details</Button>
          <Button>Cast & Crew</Button>
          <Button>Reviews</Button>
          <FilmDetailsComp filmData={movieData} />
          <FilmCastCrewComp filmCredits={movieData.credits} />
          <ReviewModal
            title={movieData?.title || movieData?.name || "Loading..."}
            cardSrc={
              movieData
                ? `${basePosterPath}${smallBannerWidth}${movieData.poster_path}`
                : ""
            }
            isOpen={isReviewOpen}
            onClose={() => {
              setIsReviewOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
export default MovieDetail;
