import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
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
import { toast } from "sonner";

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
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isEditReviewOpen, setIsEditReviewOpen] = useState(false);
  const [editedReview, setEditedReview] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("details");
  const [showGenres, setShowGenres] = useState(null);

  const { user } = useAuth();
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
  const token = localStorage.getItem("token");

  // fetches show data from the movie database
  useEffect(() => {
    const fetchShowData = async () => {
      setLoading(true);
      try {
        const queryObj = { filmId: showId, filmType: "tv" };
        const params = new URLSearchParams(queryObj);
        const response = await fetch(
          `${API_BASE_URL}/api/tmdb/film/detail?${params}`,
        );
        if (!response.ok) {
          setLoading(false);
          return;
        }
        const json = await response.json();
        const data = json.filmData;
        setShowData(data);
        setShowGenres(data.genres);
      } catch (err) {
        console.error("Error fetching show detail", err);
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
        );
        if (!response.ok) {
          setReviews([]);
          return;
        }
        const resultData = await response.json();
        setReviews(resultData);
      } catch (err) {
        setReviews([]);
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
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        if (!updateReviewRes.ok) throw new Error("Error editing review");
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
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        if (!addReviewsRes.ok) throw new Error("Error adding review");
        const responseObj = await addReviewsRes.json();
        setReviews((prev) => [...prev, responseObj]);
      }
    } catch (err) {
      toast.error("Failed to process review");
    }
  };

  const handleRating = async (newRating) => {
    if (!user) {
      navigate("/loginsignup", { state: location.pathname });
      return;
    }
    if (!newRating || newRating === 0) return;
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
    try {
      const deleteReviewRes = await fetch(
        `${API_BASE_URL}/api/reviews/delete/review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!deleteReviewRes.ok) throw new Error("Error deleting review");
      setRefreshTrigger((prev) => !prev);
      toast.success("Review deleted");
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  const openEditReview = (reviewObj) => {
    setIsEditReviewOpen(true);
    setEditedReview(reviewObj);
  };

  return (
    <main className="mt-20 md:mx-10 px-8">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
          <ClipLoader loading={loading} color="white" />
        </div>
      ) : (
        <div>
          {/* posters and interaction buttons */}
          <div className="relative w-full overflow-hidden">
            {/* blurred backdrop */}
            <div className="blur-none lg:blur-lg max-h-[75vh]">
              <FilmCard
                src={
                  showData.backdrop_path
                    ? `${basePosterPath}${heroBannerWidth}${showData.backdrop_path}`
                    : heroPosterPlaceholder
                }
              />
            </div>

            {/* Everything less backdrop, absolute position starts */}
            <div className="absolute bottom-5 left-5 p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-end">
              {/* small poster */}
              <div className="hidden lg:block w-48 md:w-56 shrink-0">
                <FilmCard
                  imgClasses="w-full h-auto rounded-lg shadow-2xl object-cover"
                  src={
                    showData.poster_path
                      ? `${basePosterPath}${smallBannerWidth}${showData.poster_path}`
                      : smallBannerPlaceHolder
                  }
                />
              </div>

              {/* Everything else but the posters */}
              <div className="w-full flex flex-col gap-2">
                <p className="text-xs md:text-md font-normal">
                  {showData.first_air_date} -{" "}
                  {showData.status === "Ended"
                    ? showData.last_air_date
                    : "Continuing"}
                </p>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-[-0.033em]">
                  {showData.title || showData.name}
                </h2>
                <div className="flex gap-2 p-3 overflow-x-auto -mx-3 mt-2">
                  {showGenres.map((genre) => (
                    <div
                      key={genre.id}
                      className="flex h-7 shrink-0 items-center justify-center gap-x-2 rounded-full border border-white/20 bg-white/10 px-3"
                    >
                      <p className="text-xs font-medium leading-normal">
                        {genre.name}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xl font-bold my-2">
                  {showData.vote_average}
                </p>

                {/* Desktop Interaction Buttons */}
                <div className="hidden md:flex flex-wrap items-center gap-4">
                  <div className="flex items-center justify-center">
                    {filmStatus.status === "watchlist" ? (
                      <IconButton
                        onClick={() => handleStatusFavorite("dropped")}
                      >
                        <BookmarkAddIcon className="text-[#b7c8e1] text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleStatusFavorite("watchlist")}
                      >
                        <BookmarkAddOutlinedIcon className="text-[#b7c8e1]" />
                      </IconButton>
                    )}

                    {filmStatus.status === "watched" ? (
                      <IconButton
                        onClick={() => handleStatusFavorite("dropped")}
                      >
                        <VisibilityIcon className="text-[#b7c8e1] text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleStatusFavorite("watched")}
                      >
                        <VisibilityOutlinedIcon className="text-[#b7c8e1]" />
                      </IconButton>
                    )}

                    {filmStatus.is_favorited ? (
                      <IconButton onClick={() => handleStatusFavorite(false)}>
                        <FavoriteIcon className="text-red-700 text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleStatusFavorite(true)}>
                        <FavoriteBorderOutlinedIcon className="text-red-700" />
                      </IconButton>
                    )}

                    <Rating
                      className="text-amber-400 drop-shadow-md [&_.MuiRating-iconEmpty]:text-amber-400/50!"
                      onChange={(event, newValue) => handleRating(newValue)}
                      name="film-rating"
                      precision={0.5}
                      value={filmRating.rating}
                    />

                    <IconButton onClick={() => setIsReviewOpen(true)}>
                      <CreateIcon className="text-white drop-shadow-md hover:text-amber-400 transition-colors" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Interaction Bar */}
            <div className="flex flex-wrap items-center gap-4 md:hidden justify-center bg-[#131b2e] h-12">
              <div className="flex items-center justify-center">
                {filmStatus.status === "watchlist" ? (
                  <IconButton onClick={() => handleStatusFavorite("dropped")}>
                    <BookmarkAddIcon className="text-[#b7c8e1] text-3xl" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleStatusFavorite("watchlist")}>
                    <BookmarkAddOutlinedIcon className="text-[#b7c8e1]" />
                  </IconButton>
                )}

                {filmStatus.status === "watched" ? (
                  <IconButton onClick={() => handleStatusFavorite("dropped")}>
                    <VisibilityIcon className="text-[#b7c8e1] text-3xl" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleStatusFavorite("watched")}>
                    <VisibilityOutlinedIcon className="text-[#b7c8e1]" />
                  </IconButton>
                )}

                {filmStatus.is_favorited ? (
                  <IconButton onClick={() => handleStatusFavorite(false)}>
                    <FavoriteIcon className="text-red-700 text-3xl" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleStatusFavorite(true)}>
                    <FavoriteBorderOutlinedIcon className="text-red-700" />
                  </IconButton>
                )}

                <Rating
                  className="cursor-pointer text-amber-400 drop-shadow-md [&_.MuiRating-iconEmpty]:text-amber-400/50! transition-all"
                  onChange={(event, newValue) => handleRating(newValue)}
                  name="film-rating-mobile"
                  precision={0.5}
                  value={filmRating.rating}
                  size="small"
                />

                <IconButton onClick={() => setIsReviewOpen(true)}>
                  <CreateIcon className="text-white" />
                </IconButton>
              </div>
            </div>
          </div>

          {/* Buttons and Content Sections */}
          <div className="p-4 md:p-8">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setCurrentMode("details")}
                className={`uppercase px-4 py-3 font-semibold transition-colors ${
                  currentMode === "details"
                    ? "border-b-2 border-[#adc6ff] text-[#dae2fd] -mb-px"
                    : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setCurrentMode("cast-crew")}
                className={`uppercase px-4 py-3 font-semibold transition-colors ${
                  currentMode === "cast-crew"
                    ? "border-b-2 border-[#adc6ff] text-[#dae2fd] -mb-px"
                    : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                }`}
              >
                Cast & Crew
              </button>
              <button
                onClick={() => setCurrentMode("reviews")}
                className={`uppercase px-4 py-3 font-semibold transition-colors ${
                  currentMode === "reviews"
                    ? "border-b-2 border-[#adc6ff] text-[#dae2fd] -mb-px"
                    : "text-[#dae2fd]/60 hover:text-[#dae2fd]"
                }`}
              >
                Reviews
              </button>
            </div>

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
                  rating={filmRating?.rating}
                />
              )}
            </div>
          </div>

          {/* Modals */}
          {isReviewOpen && (
            <ReviewModal
              title={showData?.title || showData?.name || "Loading..."}
              cardSrc={
                showData
                  ? `${basePosterPath}${smallBannerWidth}${showData.poster_path}`
                  : ""
              }
              isOpen={isReviewOpen}
              onClose={() => setIsReviewOpen(false)}
              onReviewSubmit={handleReview}
              onRatingSubmit={handleRating}
              prevRating={filmRating.rating}
            />
          )}
          {isEditReviewOpen && (
            <EditReviewModal
              isOpen={isEditReviewOpen}
              onClose={() => setIsEditReviewOpen(false)}
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
            handleCancel={() => setDeleteModalOpen(false)}
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
