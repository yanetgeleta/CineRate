import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useLibrary } from "../context/LibraryContex";
import { useAuth } from "../context/AuthContext";

function CarouselItem({ item, filmType, ...otherProps }) {
  const { getFilmStatus, statusUpdateCall, loading } = useLibrary();
  const filmStatus = getFilmStatus(item.id);
  const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);
  const [status, setStatus] = useState(filmStatus.status);
  const navigate = useNavigate();
  const { user } = useAuth();
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
    statusUpdateCall(item.id, item.media_type || filmType, action);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  // Add a clip loader later on
  return (
    <div>
      <Link
        to={`/${item.media_type === "movie" || filmType === "movie" ? "moviedetail" : "showdetail"}/${item.id}`}
      >
        <div>
          <FilmCard
            src={`${otherProps.basePath}${otherProps.bannerWidth}${otherProps.bannerWidth === "w1280" ? item.backdrop_path : item.poster_path}`}
          />
          <h2>{item.title || item.name}</h2>
          {otherProps.bannerWidth === "w1280" && (
            <>
              <p>{item.overview}</p>
              <p>{item.media_type === "tv" ? "Show" : "Movie"}</p>
              <Button
                onClick={() => {
                  otherProps.onTrailerButtonClick({
                    filmId: item.id,
                    filmType: item.media_type,
                  });
                }}
              >
                Watch Trailer
              </Button>
            </>
          )}
        </div>
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
export default CarouselItem;
