import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import Navbar from "../layouts/Navbar";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import ConfirmModal from "../components/ConfirmModal";
// This is a page that shows details of shows
function ShowDetail() {
  const { showId } = useParams();
  const { getFilmStatus, getFilmRating, statusUpdateCall, ratingUpdateCall } =
    useLibrary();
  const filmStatus = getFilmStatus(showId);
  const filmRating = getFilmRating(showId);

  const [reviews, setReviews] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  // const [rating, setRating] = useState(filmRating.rating);
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [editedReview, setEditedReview] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("details");

  const [showGenres, setShowGenres] = useState(null);
  const { user } = useAuth();

  // const [status, setStatus] = useState(filmStatus.status);
  // const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);

  const navigate = useNavigate();
  const location = useLocation();

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const heroPosterPlaceholder =
    "https://placehold.co/1280x720/black/white?text=Hero+Placeholder";
  const smallBannerPlaceHolder =
    "https://placehold.co/300/black/white?text=Small+Poster+Placeholder";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  // fetches show data from the movie database
  useEffect(() => {
    const fetchShowData = async () => {
      setLoading(true);
      try {
        const queryObj = { filmId: showId, filmType: "tv" };
        const params = new URLSearchParams(queryObj);
        const response = await fetch(
          `${API_BASE_URL}/api/tmdb/film/detail?${params}`,
          { credentials: "include" },
        );
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
          `${API_BASE_URL}/api/reviews/film/reviews?filmId=${showId}`,
          { credentials: "include" },
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
      navigate("/loginsignup", { state: location.pathname });
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
      navigate("/loginsignup", { state: location.pathname });
      return;
    }
    if (!review || review.trim() === "") return;
    try {
      if (reviewId) {
        const body = { reviewText: review };
        const updateReviewRes = await fetch(
          `${API_BASE_URL}/api/reviews/update/review/${reviewId}`,
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
        const addReviewsRes = await fetch(
          `${API_BASE_URL}/api/reviews/add/review`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        );
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
      navigate("/loginsignup", { state: location.pathname });
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
  const openDelete = (reviewId) => {
    setDeleteReviewId(reviewId);
    setDeleteModalOpen(true);
  };
  const handleDeleteReview = async (reviewId) => {
    const deleteReviewRes = await fetch(
      `${API_BASE_URL}/api/reviews/delete/review/${reviewId}`,
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
    <main className="mt-20 md:mx-10 px-8">
      {/* <Navbar user={user} /> */}
      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
          <ClipLoader
            loading={loading}
            aria-label="Loading Show Detail Spinner"
            data-testid="loader"
            color="white"
          />
        </div>
      ) : (
        <div>
          <div className="relative w-full overflow-hidden">
            <div className="blur-lg max-h-[75vh]">
              <FilmCard
                src={
                  showData.backdrop_path
                    ? `${basePosterPath}${heroBannerWidth}${showData.backdrop_path}`
                    : heroPosterPlaceholder
                }
              />{" "}
            </div>
            <div className="absolute bottom-5 left-5 p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-end">
              <div className="w-48 md:w-56 shrink-0">
                <FilmCard
                  src={
                    showData.poster_path
                      ? `${basePosterPath}${smallBannerWidth}${showData.poster_path}`
                      : smallBannerPlaceHolder
                  }
                />{" "}
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="text-md font-normal">
                  {showData.first_air_date} -{" "}
                  {showData.status === "Ended"
                    ? showData.last_air_date
                    : "Continuing"}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-[-0.033em]">
                  {showData.title || showData.name}
                </h2>
                <div className="flex gap-2 p-3 overflow-x-auto -mx-3 mt-2">
                  {showGenres.map((genre) => (
                    <div className="flex h-7 shrink-0 items-center justify-center gap-x-2 rounded-full border border-white/20 bg-white/10 px-3">
                      <p
                        className="text-xs font-medium leading-normal"
                        key={genre.id}
                      >
                        {genre.name}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-xl font-bold">{showData.vote_average}</p>
                  <div className="flex items-center justify-center">
                    {filmStatus.status === "watchlist" ? (
                      <IconButton
                        className="cursor-pointer hover:bg-[#b7c8e1]/20 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite("dropped");
                        }}
                      >
                        <BookmarkAddIcon className="text-[#b7c8e1] text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="cursor-pointer hover:bg-[#b7c8e1]/10 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite("watchlist");
                        }}
                      >
                        <BookmarkAddOutlinedIcon className="text-[#b7c8e1] transition-colors" />
                      </IconButton>
                    )}
                    {filmStatus.status === "watched" ? (
                      <IconButton
                        className="cursor-pointer hover:bg-[#b7c8e1]/20 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite("dropped");
                        }}
                      >
                        <VisibilityIcon className="text-[#b7c8e1] text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="cursor-pointer hover:bg-[#b7c8e1]/10 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite("watched");
                        }}
                      >
                        <VisibilityOutlinedIcon className="text-[#b7c8e1] transition-colors" />
                      </IconButton>
                    )}
                    {filmStatus.is_favorited ? (
                      <IconButton
                        className="cursor-pointer hover:bg-red-700/20 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite(false);
                        }}
                      >
                        <FavoriteIcon className="text-red-700 text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="cursor-pointer hover:bg-red-700/10 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite(true);
                        }}
                      >
                        <FavoriteBorderOutlinedIcon className="text-red-700 transition-colors" />
                      </IconButton>
                    )}
                    <Rating
                      className="cursor-pointer text-amber-400 drop-shadow-md [&_.MuiRating-iconEmpty]:text-amber-400/50! transition-all"
                      onChange={(event, newValue) => {
                        handleRating(newValue);
                      }}
                      name="film-rating"
                      precision={0.5}
                      value={filmRating.rating}
                    />
                    <IconButton
                      className="cursor-pointer group hover:bg-white/10 active:scale-95 transition-all duration-200"
                      onClick={() => {
                        setIsReviewOpen(true);
                      }}
                    >
                      <CreateIcon className="text-white drop-shadow-md group-hover:text-amber-400 transition-colors" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-8">
            {/* The "Track" wrapper */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => {
                  setCurrentMode("details");
                }}
                // Added -mb-px to all active states so the border overlaps correctly
                className={`uppercase px-4 py-3 font-semibold transition-colors ${
                  currentMode === "details"
                    ? "border-b-2 border-[#adc6ff] text-[#dae2fd] -mb-px"
                    : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => {
                  setCurrentMode("cast-crew");
                }}
                className={`uppercase px-4 py-3 font-semibold transition-colors ${
                  currentMode === "cast-crew"
                    ? "border-b-2 border-[#adc6ff] text-[#dae2fd] -mb-px"
                    : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                }`}
              >
                Cast & Crew
              </button>
              <button
                onClick={() => {
                  setCurrentMode("reviews");
                }}
                className={`uppercase px-4 py-3 font-semibold transition-colors ${
                  currentMode === "reviews"
                    ? "border-b-2 border-[#adc6ff] text-[#dae2fd] -mb-px"
                    : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                }`}
              >
                Reviews
              </button>
              {/* <button className="uppercase px-4 py-3 font-semibold text-[#dae2fd]/60 hover:text-[#dae2fd]">Seasons</button> */}
            </div>

            {/* Content Sections */}
            <div className="mt-6">
              {currentMode === "details" && (
                <FilmDetailsComp filmData={showData} />
              )}
              {currentMode === "cast-crew" && (
                <FilmCastCrewComp filmCredits={showData.credits} />
              )}
              {currentMode === "reviews" && (
                <FilmReviewComp
                  reviews={reviews}
                  otherReviews={otherReviews}
                  myReviews={myReviews}
                  openEditReview={openEditReview}
                  onDelete={openDelete}
                  // Passed the rating prop down just like the styled Movie block
                  rating={filmRating?.rating}
                />
              )}
            </div>
          </div>

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
          <ConfirmModal
            isOpen={deleteModalOpen}
            title={"Delete Review"}
            desc={"This will permanently delete this review from the database"}
            message={"Are you sure you want to delete this review?"}
            continueMsg={"Yes"}
            cancelMsg={"Cancel"}
            handleCancel={() => {
              setDeleteModalOpen(false);
            }}
            handleContinue={() => {
              handleDeleteReview(deleteReviewId);
              setDeleteModalOpen(false);
            }}
          />
        </div>
      )}
    </main>
  );
}
export default ShowDetail;
