import React, { useState } from "react";
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
import CarouselItem from "./CarouselItem";

const Carousel = ({
  settings,
  items,
  user,
  onTrailerButtonClick,
  bannerWidth,
  basePath,
  filmType,
}) => {
  if (!items || items.length === 0) return null;
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel, FreeMode]}
      {...settings}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <CarouselItem
            basePath={basePath}
            bannerWidth={bannerWidth}
            onTrailerButtonClick={onTrailerButtonClick}
            key={item.id}
            item={item}
            filmType={filmType}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
