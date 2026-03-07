import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "./Button";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useLibrary } from "../context/LibraryContex";

function CarouselItem({ item, filmType, ...otherProps }) {
  const { getFilmStatus, statusUpdateCall, loading } = useLibrary();
  const filmStatus = getFilmStatus(item.id);
  const [isFavorited, setIsFavorited] = useState(filmStatus.is_favorited);
  const [status, setStatus] = useState(filmStatus.status);

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
              setStatus("dropped");
              statusUpdateCall(item.id, item.media_type || filmType, "dropped");
            }}
          />
        ) : (
          <BookmarkAddOutlinedIcon
            onClick={() => {
              setStatus("watchlist");
              statusUpdateCall(
                item.id,
                item.media_type || filmType,
                "watchlist",
              );
            }}
          />
        )}
      </IconButton>
      <IconButton>
        {status === "watched" ? (
          <VisibilityIcon
            onClick={() => {
              setStatus("dropped");
              statusUpdateCall(item.id, item.media_type || filmType, "dropped");
            }}
          />
        ) : (
          <VisibilityOutlinedIcon
            onClick={() => {
              setStatus("watched");
              statusUpdateCall(item.id, item.media_type || filmType, "watched");
            }}
          />
        )}
      </IconButton>
      <IconButton>
        {isFavorited ? (
          <FavoriteIcon
            onClick={() => {
              setIsFavorited(false);
              statusUpdateCall(item.id, item.media_type || filmType, false);
            }}
          />
        ) : (
          <FavoriteBorderOutlinedIcon
            onClick={() => {
              setIsFavorited(true);
              statusUpdateCall(item.id, item.media_type || filmType, true);
            }}
          />
        )}
      </IconButton>
    </div>
  );
}
export default CarouselItem;
