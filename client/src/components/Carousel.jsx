import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
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

const Carousel = ({ settings, items, ...otherProps }) => {
  if (!items || items.length === 0) return null;
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel, FreeMode]}
      {...settings}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div>
            <FilmCard
              src={`${otherProps.basePath}${otherProps.bannerWidth}${otherProps.bannerWidth === "w1280" ? item.backdrop_path : item.poster_path}`}
            />
            <h2>{item.title || item.name}</h2>
            {otherProps.bannerWidth === "w1280" && (
              <>
                <p>{item.overview}</p>
                <p>{item.media_type === "tv" ? "Show" : "Movie"}</p>
                <Button>Watch Trailer</Button>
              </>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
