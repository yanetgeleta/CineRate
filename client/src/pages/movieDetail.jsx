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
import Rating from "@mui/material/Rating";
import FilmReviewComp from "../components/FilmReviewComp";
import EditReviewModal from "../components/EditReviewModal";

// This is the page that shows details of a specific movie when clicked on
function MovieDetail() {
  const { movieId } = useParams();
  const {
    getFilmStatus,
    getFilmRating,
    ratingUpdateCall,
    statusUpdateCall,
    loading,
  } = useLibrary();
  const filmStatus = getFilmStatus(movieId);
  const filmRating = getFilmRating(movieId);

  // const [status, setStatus] = useState(filmStatus.status);
  // const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);

  const { user } = useAuth();
  const [movieData, setMovieData] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [movieGenres, setMovieGenres] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [editedReview, setEditedReview] = useState(null);

  // First get the reviews that are mine and put them up top so i can edit them or delete them
  // Second get the other people's reviews just for views
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(filmRating.rating);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  // const [newReview, setNewReview] = useState("");
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
        );
        if (!response.ok) {
          setReviews([]);
          throw new Error("Error fetching film reviews at Movie Details");
        }
        const resultData = await response.json();
        setReviews(resultData);
      } catch (err) {
        setReviews([]);
        throw new Error("Error trying to get film reviews at movie details");
      }
    }
    fetchFilmReviews();
  }, [movieId, refreshTrigger]);
  // useEffect(() => {
  //   setRating(filmRating.rating);
  // }, [rating, filmRating.rating, refreshTrigger]);

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
  // handles film status and favorite interactions
  const handleStatusFavorite = (action) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    statusUpdateCall(movieId, "movie", action);
  };
  // sends rating and updates to the database
  const handleRating = async (newRating) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    if (!newRating || newRating === 0) {
      return;
    }
    ratingUpdateCall(newRating, "movie", movieId);
  };
  // handles: updating review, adding a new review
  const handleReview = async (review, reviewId) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    if (!review || review.trim() === "") return;
    try {
      if (reviewId) {
        const body = { reviewText: review };
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
        // setReviews((prev) => [...prev, responseObj]);
        setRefreshTrigger((prev) => !prev);
      } else {
        const body = { review: review, filmId: movieId, filmType: "movie" };
        const addReviewsRes = await fetch(`/api/reviews/add/review`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!addReviewsRes.ok) {
          throw new Error("Error adding a new review for a movie");
        }
        const responseObj = await addReviewsRes.json();
        setReviews((prev) => [...prev, responseObj]);
      }
    } catch (err) {
      throw new Error("Failed to add or update review for movie");
    }
  };
  const handleDeleteReview = async (reviewId) => {
    const deleteReviewRes = await fetch(
      `/api/reviews/delete/review/${reviewId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );
    if (!deleteReviewRes.ok) {
      throw new Error("Error deleting a review");
    }
    setRefreshTrigger((prev) => !prev);
  };
  const openEditReview = (reviewObj) => {
    setIsEditReviewOpen(true);
    setEditedReview(reviewObj);
  };

  const myReviews = user
    ? reviews.filter((r) => String(r.user_id) === String(user.id))
    : null;
  const otherReviews = user
    ? reviews.filter((r) => String(r.user_id) !== String(user.id))
    : null;

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
          {filmStatus.status === "watchlist" ? (
            <IconButton
              onClick={() => {
                handleStatusFavorite("dropped");
              }}
            >
              {" "}
              <BookmarkAddIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleStatusFavorite("watchlist");
              }}
            >
              <BookmarkAddOutlinedIcon />
            </IconButton>
          )}
          {filmStatus.status === "watched" ? (
            <IconButton
              onClick={() => {
                handleStatusFavorite("dropped");
              }}
            >
              <VisibilityIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleStatusFavorite("watched");
              }}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          )}
          {filmStatus.is_favorited ? (
            <IconButton
              onClick={() => {
                handleStatusFavorite(false);
              }}
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleStatusFavorite(true);
              }}
            >
              <FavoriteBorderOutlinedIcon />
            </IconButton>
          )}
          <Rating
            onChange={(event, newValue) => {
              handleRating(newValue);
            }}
            name="film-rating"
            precision={0.5}
            value={filmRating.rating}
          />
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
          <FilmReviewComp
            reviews={reviews}
            otherReviews={otherReviews}
            myReviews={myReviews}
            openEditReview={openEditReview}
            onDelete={handleDeleteReview}
          />
          {/* A modal that gets rendered conditionally for review writing purpose */}
          {isReviewOpen && (
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
              prevRating={filmRating.rating}
            />
          )}
          {isEditReviewOpen && (
            <EditReviewModal
              isOpen={isEditReviewOpen}
              onClose={() => {
                setIsEditReviewOpen(false);
              }}
              onReviewSubmit={handleReview}
              onRatingSubmit={handleRating}
              prevRating={filmRating.rating}
              prevReview={editedReview}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default MovieDetail;
