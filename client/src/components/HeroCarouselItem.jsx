import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
import { useLibrary } from "../context/LibraryContex";
import { useAuth } from "../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const HeroCarouselItem = ({
  basePath,
  bannerWidth,
  onTrailerButtonClick,
  item,
  filmType,
}) => {
  const { getFilmStatus, statusUpdateCall, loading } = useLibrary();
  const filmStatus = getFilmStatus(item.id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleInteraction = (action) => {
    if (!user) {
      navigate("/loginsignup");
      return;
    }
    // setStatus(action);
    // if (typeof action === "boolean") {
    //   setIsFavorited(action);
    // } else {
    //   setStatus(action);
    // }
    statusUpdateCall(
      item.id,
      item.media_type || filmType,
      action,
      item.poster_path,
      item.title || item.name,
    );
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  // Add a clip loader later on
  return (
    <div>
      <div className="relative group">
        <Link
          to={`/${item.media_type === "movie" || filmType === "movie" ? "moviedetail" : "showdetail"}/${item.id}`}
        >
          <FilmCard
            // imgClasses="rounded-2xl"
            src={`${basePath}${bannerWidth}${item.backdrop_path}`}
          />
          <div className="hidden group-hover:block z-10 absolute bottom-15 left-2">
            <h2 className="text-4xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9] text-[#dae2fd]">
              {item.title || item.name}
            </h2>
            <div>
              <p className="hidden md:block text-lg text-[#c2c6d6] mb-8 max-w-xl leading-relaxed">
                {item.overview}
              </p>
              {/* <div className="border-primary px-8 py-3 rounded-xl font-bold flex items-center justify-center shadow-xl shadow-primary/10 hidden md:block md:w-1/11">
                  {item.media_type === "tv" ? "Show" : "Movie"}
                </div> */}
            </div>
          </div>
        </Link>
        <div className="hidden group-hover:flex gap-4 absolute bottom-6 left-2 z-20">
          <button
            className="bg-[#adc6ff] text-[#002e6a] px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#4d8eff] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#adc6ff]/10"
            onClick={() => {
              onTrailerButtonClick({
                filmId: item.id,
                filmType: item.media_type,
              });
            }}
          >
            <PlayArrowIcon /> Watch Trailer
          </button>
          {filmStatus.status !== "watchlist" ? (
            <button
              className="bg-[#222a3d]/60 backdrop-blur-md text-[#dae2fd] px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#31394d] transition-all hover:scale-105 active:scale-95"
              onClick={() => {
                handleInteraction("watchlist");
              }}
            >
              <BookmarkAddIcon />
              Wathclist
            </button>
          ) : (
            <button
              className="bg-[#222a3d]/60 backdrop-blur-md text-[#dae2fd] px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#31394d] transition-all hover:scale-105 active:scale-95"
              onClick={() => {
                handleInteraction("dropped");
              }}
            >
              <BookmarkRemoveIcon />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCarouselItem;
