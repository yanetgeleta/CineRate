import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";
import {
  A11y,
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  FreeMode,
} from "swiper/modules";
import FilmCard from "./FilmCard";
import Button from "./Button";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const Carousel = ({ settings, items, user, ...otherProps }) => {
  const filmType = otherProps.filmType;
  const [filmStatus, setFilmStatus] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);

  async function statusUpdateCall(filmId, mediaType, updatedStatus) {
    const body = {
      filmId: filmId,
      mediaType: mediaType || filmType,
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
    console.log(response);
  }

  if (!items || items.length === 0) return null;
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel, FreeMode]}
      {...settings}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
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
            <FavoriteBorderOutlinedIcon
              onClick={() => {
                setIsFavorite(true);
                statusUpdateCall(item.id, item.media_type, isFavorite);
              }}
            />
          </IconButton>
          <IconButton>
            <BookmarkAddOutlinedIcon
              onClick={() => {
                setFilmStatus("watchlist");
                statusUpdateCall(item.id, item.media_type, filmStatus);
              }}
            />
          </IconButton>
          <IconButton>
            <VisibilityOutlinedIcon
              onClick={() => {
                setFilmStatus("watched");
                statusUpdateCall(item.id, item.media_type, filmStatus);
              }}
            />
          </IconButton>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
