import React, { useState } from "react";
import FilmCard from "./FilmCard";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

function FilmItem({ film, filmType }) {
  const [status, setStatus] = useState(null);
  const [isFavorited, setIsFavorited] = useState(null);
  async function statusUpdateCall(filmId, updatedStatus) {
    const body = {
      filmId: filmId,
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
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
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
          </p>
        </Link>
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
      </div>
    </div>
  );
}
export default FilmItem;
