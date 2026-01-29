import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { A11y, Navigation, Pagination, Autoplay } from "swiper/modules";
import FilmCard from "./FilmCard";
import Button from "./Button";

const Carousel = ({ children, settings = {}, props }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={40}
      slidesPerView={props.slidesPerView}
      pagination={props.pagination && { clickable: true }}
    >
      {React.Children.map(children, (child) => {
        return (
          <SwiperSlide>
            {child.map((film) => {
              return (
                <div key={film.id}>
                  <FilmCard
                    src={`${props.basePath}${props.bannerWidth}${props.bannerWidth === "w1280" ? film.backdrop_path : film.poster_path}`}
                  />
                  <h2>{film.title ? film.title : film.name}</h2>
                  {props.bannerWidth === "w1280"} && <p>{film.overview}</p>
                  {props.bannerWidth === "w1280"} &&{" "}
                  <p>{film.media_type === "tv" ? "Show" : "Movie"}</p>
                  {props.bannerWidth === "w1280"} &&{" "}
                  <Button>Watch Trailer</Button>
                </div>
              );
            })}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
