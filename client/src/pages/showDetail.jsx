import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import Navbar from "../layouts/Navbar";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FilmDetailsComp from "../components/FilmDetailsComp";
import FilmCastCrewComp from "../components/FilmCastCrewComp";
import { useAuth } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLibrary } from "../context/LibraryContex";
import Rating from "@mui/material/Rating";
import FilmReviewComp from "../components/FilmReviewComp";
import ReviewModal from "../components/ReviewModal";
import EditReviewModal from "../components/EditReviewModal";
// This is a page that shows details of shows
function ShowDetail() {
  const { showId } = useParams();
  const { getFilmStatus, getFilmRating, statusUpdateCall, ratingUpdateCall } =
    useLibrary();
  const filmStatus = getFilmStatus(showId);
  const filmRating = getFilmRating(showId);

  const [reviews, setReviews] = useState([]);
  // const [rating, setRating] = useState(filmRating.rating);
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [editedReview, setEditedReview] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [showGenres, setShowGenres] = useState(null);
  const { user } = useAuth();

  // const [status, setStatus] = useState(filmStatus.status);
  // const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);

  const navigate = useNavigate();

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";

  // fetches show data from the movie database
  useEffect(() => {
    const fetchShowData = async () => {
      setLoading(true);
      try {
        const queryObj = { filmId: showId, filmType: "tv" };
        const params = new URLSearchParams(queryObj);
        const response = await fetch(`/api/tmdb/film/detail?${params}`);
        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch show detail from the backend");
        }
        const json = await response.json();
        const data = json.filmData;
        setShowData(data);
        setShowGenres(data.genres);
      } catch (err) {
        setLoading(false);
        throw new Error("Error fetching show detail form the backend");
      } finally {
        setLoading(false);
      }
    };
    fetchShowData();
  }, [showId]);
  // fetches show reviews from the database
  useEffect(() => {
    async function fetchFilmReviews() {
      try {
        const response = await fetch(
          `/api/reviews/film/reviews?filmId=${showId}`,
        );
        if (!response.ok) {
          setReviews([]);
          throw new Error("Error fetching film reviews at Show Details");
        }
        const resultData = await response.json();
        setReviews(resultData);
      } catch (err) {
        setReviews([]);
        throw new Error("Error trying to get film reviews at show details");
      }
    }
    fetchFilmReviews();
  }, [showId, refreshTrigger]);

  const myReviews = user
    ? reviews.filter((r) => String(r.user_id) === String(user.id))
    : null;
  const otherReviews = user
    ? reviews.filter((r) => String(r.user_id) !== String(user.id))
    : null;

  const handleStatusFavorite = (action) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    statusUpdateCall(
      showId,
      "tv",
      action,
      showData.poster_path,
      showData.title || showData.name,
    );
  };
  // new review and edit existing one for a show
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
          throw new Error("Error editing review for a show");
        }
        const responseObj = await updateReviewRes.json();
        // setReviews((prev) => [...prev, responseObj]);
        setRefreshTrigger((prev) => !prev);
      } else {
        const body = {
          review: review,
          filmId: showId,
          filmType: "tv",
          posterPath: showData.poster_path,
          title: showData.title || showData.name,
        };
        const addReviewsRes = await fetch(`/api/reviews/add/review`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!addReviewsRes.ok) {
          throw new Error("Error adding a new review for a show");
        }
        const responseObj = await addReviewsRes.json();
        setReviews((prev) => [...prev, responseObj]);
      }
    } catch (err) {
      throw new Error("Failed to add or update review for show");
    }
  };
  // sends post request to the backend with rating value
  const handleRating = async (newRating) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    if (!newRating || newRating === 0) {
      return;
    }
    ratingUpdateCall(
      newRating,
      "tv",
      showId,
      showData.poster_path,
      showData.title || showData.name,
    );
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

  return (
    <div>
      <Navbar user={user} />
      {loading ? (
        <ClipLoader
          loading={loading}
          aria-label="Loading Show Detail Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <FilmCard
            src={`${basePosterPath}${heroBannerWidth}${showData.backdrop_path}`}
          />{" "}
          {/* the big background */}
          <FilmCard
            src={`${basePosterPath}${smallBannerWidth}${showData.poster_path}`}
          />{" "}
          {/* the smaller card */}
          <h2>{showData.title || showData.name}</h2>
          <p>{showData.vote_average}</p>
          <p>
            {showData.first_air_date} -{" "}
            {showData.status === "Ended"
              ? showData.last_air_date
              : "Continuing"}
          </p>
          {showGenres.map((genre) => (
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
          <Button>Seasons</Button>
          <Button>Reviews</Button>
          {/* <FilmDetailsComp filmData={showData} />
          <FilmCastCrewComp filmCredits={showData.credits} /> */}
          {/* Each button will render its respective information */}
          <FilmReviewComp
            reviews={reviews}
            otherReviews={otherReviews}
            myReviews={myReviews}
            openEditReview={openEditReview}
            onDelete={handleDeleteReview}
          />
          {isReviewOpen && (
            <ReviewModal
              title={showData?.title || showData?.name || "Loading..."}
              cardSrc={
                showData
                  ? `${basePosterPath}${smallBannerWidth}${showData.poster_path}`
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
export default ShowDetail;
