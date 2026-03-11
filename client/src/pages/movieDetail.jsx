import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FilmDetailsComp from "../components/FilmDetailsComp";
import FilmCastCrewComp from "../components/FilmCastCrewComp";
import { useAuth } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import ReviewModal from "../components/ReviewModal";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLibrary } from "../context/LibraryContex";

// This is the page that shows details of a specific movie when clicked on
function MovieDetail() {
  const { movieId } = useParams();
  const { getFilmStatus, getFilmRating, statusUpdateCall, loading } =
    useLibrary();
  const filmStatus = getFilmStatus(movieId);
  const filmRating = getFilmRating(movieId);

  const [status, setStatus] = useState(filmStatus.status);
  const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);

  const { user } = useAuth();
  const [movieData, setMovieData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [movieGenres, setMovieGenres] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // First get the reviews that are mine and put them up top so i can edit them or delete them
  // Second get the other people's reviews just for views
  const [reviews, setReviews] = useState([]);
  // If a user exists we update these
  const [myReviews, setMyReviews] = useState(null);
  const [otherReviews, setOtherReviews] = useState(null);
  const [rating, setRating] = useState(filmRating.rating);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [newReviewTrigger, setNewReviewTrigger] = useState(false);
  const [updateReviewTrigger, setUpdateReviewTrigger] = useState(false);
  const navigate = useNavigate();

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";

  // Gets all the comments for the single movie
  useEffect(() => {
    async function fetchFilmReviews() {
      try {
        const response = await fetch(
          `/api/reviews/film/reviews?filmId=${movieId}`,
          { credentials: "include" },
        );
        if (!response.ok) {
          setReviews([]);
          throw new Error("Error fetching film reviews at Movie Detai");
        }
        const resultData = await response.json();
        setReviews(resultData);
        setMyReviews(
          user ? resultData.filter((r) => r.user_id === user.id) : [],
        );
        setOtherReviews(
          user ? resultData.filter((r) => r.user_id !== user.id) : resultData,
        );
      } catch (err) {
        setReviews([]);
        throw new Error(
          "Error trying to get film reviews from Library context",
        );
      }
    }
    fetchFilmReviews();
  }, [movieId, refreshTrigger]);
  // fetches all the movie data from the backend
  useEffect(() => {
    const fetchMovieData = async () => {
      setPageLoading(true);
      try {
        const queryObj = { filmId: movieId, filmType: "movie" };
        const params = new URLSearchParams(queryObj);
        const response = await fetch(`/api/tmdb/film/detail?${params}`);
        if (!response.ok) {
          console.log(new Error("Failed to fetch movie detail"));
          setPageLoading(false);
          return;
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
        setPageLoading(false);
      }
    };
    fetchMovieData();
  }, [movieId]);
  // add new review to the database and add it to the local state
  useEffect(() => {
    const makeNewReview = async () => {
      try {
        const body = { review: newReview, filmId: movieId, filmType: "movie" };
        const addReviewsRes = await fetch(`/api/reviews/add/review`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!addReviewsRes.ok) {
          throw new Error("Error adding review for a movie");
        }
        const responseObj = await addReviewsRes.json();
        setMyReviews((prev) => [...prev, responseObj]);
        setReviews((prev) => [...prev, responseObj]);
      } catch (err) {
        throw new Error("Error adding review to the backend for a movie");
      }
    };
    makeNewReview();
  }, [movieId, newReviewTrigger]);
  // update an exisitng one
  useEffect(() => {
    const updateReviews = async () => {
      try {
        const body = { reviewText: newReview };
        const updateReviewRes = await fetch(
          `/api/reviews/update/review/${reviewId}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
        if (!updateReviewRes.ok) {
          throw new Error("Error editing review for a movie");
        }
        const responseObj = await updateReviewRes.json();
        setMyReviews((prev) => [...prev, responseObj]);
        setReviews((prev) => [...prev, responseObj]);
      } catch (err) {
        throw new Error("Error editing a review at the backend for a movie");
      }
    };
    updateReviews();
  }, [movieId, updateReviewTrigger]);

  const handleStatusFavorite = (action) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    if (typeof action === "boolean") {
      setIsFavorited(action);
    } else {
      setStatus(action);
    }
    statusUpdateCall(movieId, "movie", action);
    setMyReviews();
  };
  const handleRating = () => {};
  const handleReview = async (review, reviewId) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    // handle the new vs old review in here
    setNewReview(review);
    reviewId
      ? setUpdateReviewTrigger((prev) => !prev)
      : setNewReviewTrigger((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      {pageLoading ? (
        <ClipLoader
          loading={pageLoading}
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
            {status === "watchlist" ? (
              <BookmarkAddIcon
                onClick={() => {
                  handleStatusFavorite("dropped");
                }}
              />
            ) : (
              <BookmarkAddOutlinedIcon
                onClick={() => {
                  handleStatusFavorite("watchlist");
                }}
              />
            )}
          </IconButton>
          <IconButton>
            {status === "watched" ? (
              <VisibilityIcon
                onClick={() => {
                  handleStatusFavorite("dropped");
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                onClick={() => {
                  handleStatusFavorite("watched");
                }}
              />
            )}
          </IconButton>
          <IconButton>
            {isFavorited ? (
              <FavoriteIcon
                onClick={() => {
                  handleStatusFavorite(false);
                }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                onClick={() => {
                  handleStatusFavorite(true);
                }}
              />
            )}
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
          {/* <FilmDetailsComp filmData={movieData} /> */}
          {/* <FilmCastCrewComp filmCredits={movieData.credits} /> */}
          {/* A modal that gets rendered conditionally for review writing purpose */}
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
            onReviewSubmit={handleReview}
            onRatingSubmit={handleRating}
          />
        </div>
      )}
    </div>
  );
}
export default MovieDetail;
