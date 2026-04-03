import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "sonner";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const [currentMode, setCurrentMode] = useState("details");

  // First get the reviews that are mine and put them up top so i can edit them or delete them
  // Second get the other people's reviews just for views
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(filmRating.rating);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  // const [newReview, setNewReview] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const heroPosterPlaceholder =
    "https://placehold.co/1280x720/black/white?text=Hero+Placeholder";
  const smallBannerPlaceHolder =
    "https://placehold.co/300/black/white?text=Small+Poster+Placeholder";

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
      navigate("/loginsignup", { state: location.pathname });
      return;
    }
    statusUpdateCall(
      movieId,
      "movie",
      action,
      movieData.poster_path,
      movieData.title || movieData.name,
    );
  };
  // sends rating and updates to the database
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
      "movie",
      movieId,
      movieData.poster_path,
      movieData.title || movieData,
    );
  };
  // handles: updating review, adding a new review
  const handleReview = async (review, reviewId) => {
    if (!user) {
      navigate("/loginsignup", { state: location.pathname });
      return;
    }
    if (!review || review.trim() === "") return;
    try {
      // Meaning it's an edit
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
        // a new review
        const body = {
          review: review,
          filmId: movieId,
          filmType: "movie",
          posterPath: movieData.poster_path,
          title: movieData.title || movieData.name,
        };
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
  const openDelete = (reviewId) => {
    setDeleteReviewId(reviewId);
    setDeleteModalOpen(true);
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
    <main className="mt-20 md:mx-10 px-8">
      {/* <Navbar /> */}
      {pageLoading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
          <ClipLoader
            loading={pageLoading}
            aria-label="Loading Movie Detail Spinner"
            data-testid="loader"
            color="white"
          />
        </div>
      ) : (
        <div>
          {/* posters and interaction buttons */}
          <div className="relative w-full overflow-hidden">
            {/* blurred backdrop */}
            <div className="blur-lg max-h-[75vh]">
              {/* Backdrop */}
              <FilmCard
                src={
                  movieData.backdrop_path
                    ? `${basePosterPath}${heroBannerWidth}${movieData.backdrop_path}`
                    : heroPosterPlaceholder
                }
              />
            </div>
            {/* Everything less backdrop */}
            <div className="absolute bottom-5 left-5 p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-end">
              {/* small poster */}
              <div className="w-48 md:w-56 shrink-0">
                <FilmCard
                  imgClasses="w-full h-auto rounded-lg shadow-2xl object-cover"
                  src={
                    movieData.poster_path
                      ? `${basePosterPath}${smallBannerWidth}${movieData.poster_path}`
                      : smallBannerPlaceHolder
                  }
                />
              </div>
              {/* Everyting else but the posters */}
              <div className="w-full flex flex-col gap-2">
                <p className="text-md font-normal">{movieData.release_date}</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-[-0.033em]">
                  {movieData.title || movieData.name}
                </h2>
                <div className="flex gap-2 p-3 overflow-x-auto -mx-3 mt-2">
                  {movieGenres.map((genre) => (
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
                  <p className="text-xl font-bold">{movieData.vote_average}</p>
                  {/* Will be replace by my own rating on the second version maybe */}
                  {/* <p>{movieData.overview}</p> */}
                  <div className="flex items-center justify-center">
                    {filmStatus.status === "watchlist" ? (
                      <IconButton
                        className="cursor-pointer hover:bg-[#b7c8e1]/20 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => {
                          handleStatusFavorite("dropped");
                        }}
                      >
                        {" "}
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
                        onClick={() => handleStatusFavorite("dropped")}
                      >
                        <VisibilityIcon className="text-[#b7c8e1] text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="cursor-pointer  hover:bg-[#b7c8e1]/10 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => handleStatusFavorite("watched")}
                      >
                        <VisibilityOutlinedIcon className="text-[#b7c8e1] transition-colors" />
                      </IconButton>
                    )}
                    {filmStatus.is_favorited ? (
                      <IconButton
                        className="cursor-pointer hover:bg-red-700/20 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => handleStatusFavorite(false)}
                      >
                        <FavoriteIcon className="text-red-700 text-3xl drop-shadow-md" />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="cursor-pointer hover:bg-red-700/10 hover:scale-110 active:scale-95 transition-all duration-200"
                        onClick={() => handleStatusFavorite(true)}
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
          {/* Buttons and respective infos */}
          <div className="p-4 md:p-8">
            {/* Buttons */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => {
                  setCurrentMode("details");
                }}
                className={`uppercase px-4 py-3 font-semibold  ${currentMode === "details" ? "border-b-2 border-[#adc6ff] text-[#dae2fd]" : "text-[#dae2fd]/60 hover:text-[#dae2fd]"} `}
              >
                Details
              </button>
              <button
                onClick={() => {
                  setCurrentMode("cast-crew");
                }}
                className={`uppercase px-4 py-3 font-semibold  ${currentMode === "cast-crew" ? "border-b-2 border-[#adc6ff] pb-[-2px] text-[#dae2fd]" : "text-[#dae2fd]/60 hover:text-[#dae2fd]"} `}
              >
                Cast & Crew
              </button>
              <button
                onClick={() => {
                  setCurrentMode("reviews");
                }}
                className={`uppercase px-4 py-3 font-semibold  ${currentMode === "reviews" ? "border-b-2 border-[#adc6ff] text-[#dae2fd]" : "text-[#dae2fd]/60 hover:text-[#dae2fd]"} `}
              >
                Reviews
              </button>
            </div>
            {currentMode === "details" && (
              <FilmDetailsComp filmData={movieData} />
            )}
            {currentMode === "cast-crew" && (
              <FilmCastCrewComp filmCredits={movieData.credits} />
            )}
            {currentMode === "reviews" && (
              <FilmReviewComp
                reviews={reviews}
                otherReviews={otherReviews}
                myReviews={myReviews}
                openEditReview={openEditReview}
                onDelete={openDelete}
                rating={filmRating.rating}
              />
            )}
          </div>

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
          <ConfirmModal
            isOpen={deleteModalOpen}
            title={"Delete Review?"}
            desc={"This will permanently delete this review from the database"}
            message={"Are you sure you want to delete this review?"}
            continueMsg={"Delete"}
            cancelMsg={"Cancel"}
            continueMsgClass="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors duration-200"
            cancelMsgClass="flex-1 px-4 py-2.5 rounded-lg bg-[#2513ec]/10 hover:bg-[#2513ec]/20 text-slate-100 font-bold text-sm transition-colors duration-200"
            handleCancel={() => {
              setDeleteModalOpen(false);
            }}
            handleContinue={() => {
              handleDeleteReview(deleteReviewId);
              setDeleteModalOpen(false);
              toast("Review deleted successfully");
            }}
          />
        </div>
      )}
    </main>
  );
}
export default MovieDetail;
