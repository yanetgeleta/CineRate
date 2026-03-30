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
    statusUpdateCall(
      film.id,
      film.media_type || filmType,
      action,
      film.poster_path,
      film.title || film.name,
    );
  };
  const smallBannerPlaceHolder =
    "https://placehold.co/300/black/white?text=Small+Poster+Placeholder";
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="group cursor-pointer relative">
      <Link
        to={`/${film.media_type === "movie" || filmType === "movie" ? "moviedetail" : "showdetail"}/${film.id}`}
      >
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-xl group-hover:shadow-[#adc6ff]/20 transition-all duration-300 ">
          <FilmCard
            imgClasses="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={
              film.poster_path
                ? `${basePosterPath}${smallBannerWidth}${film.poster_path}`
                : smallBannerPlaceHolder
            }
          />
        </div>
        <p className="font-bold text-lg text-[#dae2fd] leading-tight group-hover:text-[#adc6ff] transition-colors">
          {film.title || film.name}
        </p>
        {/* A feature for the second version */}
        {/* <p className="text-sm text-gray-600 italic">
          Rating: {film.vote_average}
        </p> */}
        {/* We will change this to be our own rating */}
      </Link>

      <div className="hidden group-hover:flex absolute bottom-20 left-[23%] gap-1.5 bg-white/10 backdrop-blur-md rounded-sm group-hover:scale-105 transition-all duration-500 ">
        {status === "watchlist" ? (
          <IconButton
            onClick={() => {
              handleInteraction("dropped");
            }}
          >
            <BookmarkAddIcon className="text-[#b7c8e1] text-3xl" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleInteraction("watchlist");
            }}
          >
            <BookmarkAddOutlinedIcon />
          </IconButton>
        )}
        {status === "watched" ? (
          <IconButton
            onClick={() => {
              handleInteraction("dropped");
            }}
          >
            <VisibilityIcon className="text-[#b7c8e1] text-3xl" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleInteraction("watched");
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        )}
        {isFavorited ? (
          <IconButton>
            <FavoriteIcon
              className="text-red-700 text-3xl"
              onClick={() => {
                handleInteraction(false);
              }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleInteraction(true);
            }}
          >
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}
export default FilmItem;
