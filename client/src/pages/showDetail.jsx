import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import Navbar from "../layouts/Navbar";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
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
// This is a page that shows details of shows
function ShowDetail() {
  const { showId } = useParams();
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const [showGenres, setShowGenres] = useState(null);
  const { user } = useAuth();
  const [status, setStatus] = useState(null);
  const [isFavorited, setIsFavorited] = useState(null);

  async function statusUpdateCall(updatedStatus) {
    const body = {
      filmId: showId,
      mediaType: "tv",
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
          <IconButton>
            {status === "watchlist" ? (
              <BookmarkAddIcon
                onClick={() => {
                  setStatus("dropped");
                  statusUpdateCall("dropped");
                }}
              />
            ) : (
              <BookmarkAddOutlinedIcon
                onClick={() => {
                  setStatus("watchlist");
                  statusUpdateCall("watchlist");
                }}
              />
            )}
          </IconButton>
          <IconButton>
            {status === "watched" ? (
              <VisibilityIcon
                onClick={() => {
                  setStatus("dropped");
                  statusUpdateCall("dropped");
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                onClick={() => {
                  setStatus("watched");
                  statusUpdateCall("watched");
                }}
              />
            )}
          </IconButton>
          <IconButton>
            {isFavorited ? (
              <FavoriteIcon
                onClick={() => {
                  setIsFavorited(false);
                  statusUpdateCall(false);
                }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                onClick={() => {
                  setIsFavorited(true);
                  statusUpdateCall(true);
                }}
              />
            )}
          </IconButton>
          <IconButton>
            <StarIcon /> Rate
          </IconButton>
          <IconButton>
            <CreateIcon />
          </IconButton>
          <Button>Details</Button>
          <Button>Cast & Crew</Button>
          <Button>Seasons</Button>
          <Button>Reviews</Button>
          <FilmDetailsComp filmData={showData} />
          <FilmCastCrewComp filmCredits={showData.credits} />
          {/* Each button will render its respective information */}
        </div>
      )}
    </div>
  );
}
export default ShowDetail;
