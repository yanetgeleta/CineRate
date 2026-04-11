import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "./Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useLibrary } from "../context/LibraryContex";
import { useAuth } from "../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toast } from "sonner";

function CarouselItem({ item, filmType, ...otherProps }) {
  const smallBannerPlaceHolder =
    "https://placehold.co/300/black/white?text=Small+Poster+Placeholder";
  const { getFilmStatus, statusUpdateCall, loading } = useLibrary();
  const filmStatus = getFilmStatus(item.id);
  const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);
  const [status, setStatus] = useState(filmStatus.status);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const handleInteraction = (action) => {
    if (!user) {
      navigate("/loginsignup", { state: location.pathname });
      return;
    }
    if (typeof action === "boolean") {
      setIsFavorited(action);
    } else {
      setStatus(action);
    }
    statusUpdateCall(
      item.id,
      item.media_type || filmType,
      action,
      item.poster_path,
      item.title || item.name,
    );
  };
  if (loading) {
    return (
      <div>
        <div className="relative aspect-2/3 rounded-2xl overflow-hidden mb-4 shadow-xl group-hover:shadow-[#adc6ff]/20 transition-all duration-300">
          <FilmCard
            imgClasses={
              "w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
            }
            src={
              `${otherProps.basePath}${otherProps.bannerWidth}${item.poster_path}` ||
              smallBannerPlaceHolder
            }
            alt="A small film poster card"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-[#dae2fd] font-semibold text-base group-hover:text-[#adc6ff] transition-colors">
            {item.title || item.name}
          </h2>
        </div>
      </div>
    );
  }

  // Add a clip loader later on
  return (
    <div className="relative group transition-all duration-300">
      <Link
        to={`/${item.media_type === "movie" || filmType === "movie" ? "moviedetail" : "showdetail"}/${item.id}`}
      >
        <div className="relative aspect-2/3 rounded-2xl overflow-hidden mb-4 shadow-xl group-hover:shadow-[#adc6ff]/20 transition-all duration-300">
          <FilmCard
            imgClasses={
              "w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
            }
            src={
              `${otherProps.basePath}${otherProps.bannerWidth}${item.poster_path}` ||
              smallBannerPlaceHolder
            }
            alt="A small film poster card"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-[#dae2fd] font-semibold text-base group-hover:text-[#adc6ff] transition-colors">
            {item.title || item.name}
          </h2>
        </div>
      </Link>
      <div className="hidden group-hover:flex absolute bottom-15 left-[23%] gap-1.5 bg-white/10 backdrop-blur-md rounded-sm group-hover:scale-105 transition-all duration-500 ">
        {!user ? (
          <IconButton
            onClick={() => {
              handleInteraction("watchlist");
            }}
          >
            <BookmarkAddOutlinedIcon />
          </IconButton>
        ) : status === "watchlist" ? (
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
            {" "}
            <BookmarkAddOutlinedIcon />
          </IconButton>
        )}
        {!user ? (
          <IconButton
            onClick={() => {
              handleInteraction("watched");
            }}
          >
            <VisibilityOutlinedIcon />
          </IconButton>
        ) : status === "watched" ? (
          <IconButton
            onClick={() => {
              handleInteraction("dropped");
            }}
          >
            {" "}
            <VisibilityIcon className="text-[#b7c8e1] text-3xl" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleInteraction("watched");
            }}
          >
            {" "}
            <VisibilityOutlinedIcon />
          </IconButton>
        )}
        {!user ? (
          <IconButton
            onClick={() => {
              handleInteraction(true);
            }}
          >
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        ) : isFavorited ? (
          <IconButton
            onClick={() => {
              handleInteraction(false);
            }}
          >
            {" "}
            <FavoriteIcon className="text-red-700 text-3xl" />
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
export default CarouselItem;
