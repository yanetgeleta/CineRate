import React, { useState } from "react";
import FilmCard from "./FilmCard";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useLibrary } from "../context/LibraryContex";
import { useAuth } from "../context/AuthContext";

function FilmItem({ film, filmType, basePosterPath, smallBannerWidth }) {
  const { getFilmStatus, statusUpdateCall, loading } = useLibrary();
  const filmStatus = getFilmStatus(film.id);
  const [status, setStatus] = useState(filmStatus.status);
  const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInteraction = (action) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    if (typeof action === "boolean") {
      setIsFavorited(action);
    } else {
      setStatus(action);
    }
    statusUpdateCall(film.id, film.media_type || filmType, action);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col border border-gray-200 rounded p-2">
      <Link
        to={`/${film.media_type === "movie" || filmType === "movie" ? "moviedetail" : "showdetail"}/${film.id}`}
      >
        <FilmCard
          src={`${basePosterPath}${smallBannerWidth}${film.poster_path}`}
        />
        <p className="font-bold">{film.title}</p>
        <p className="text-sm text-gray-600 italic">
          Rating: {film.vote_average}
          {/* We will change this to be our own rating */}
        </p>
      </Link>
      <IconButton>
        {status === "watchlist" ? (
          <BookmarkAddIcon
            onClick={() => {
              handleInteraction("dropped");
            }}
          />
        ) : (
          <BookmarkAddOutlinedIcon
            onClick={() => {
              handleInteraction("watchlist");
            }}
          />
        )}
      </IconButton>
      <IconButton>
        {status === "watched" ? (
          <VisibilityIcon
            onClick={() => {
              handleInteraction("dropped");
            }}
          />
        ) : (
          <VisibilityOutlinedIcon
            onClick={() => {
              handleInteraction("watched");
            }}
          />
        )}
      </IconButton>
      <IconButton>
        {isFavorited ? (
          <FavoriteIcon
            onClick={() => {
              handleInteraction(false);
            }}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => {
              handleInteraction(true);
            }}
          />
        )}
      </IconButton>
    </div>
  );
}
export default FilmItem;
