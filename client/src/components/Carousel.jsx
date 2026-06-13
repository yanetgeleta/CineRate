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
import { useAuth } from "../context/AuthContext";
import HeroCarouselItem from "./HeroCarouselItem";

const Carousel = ({
  settings,
  items,
  onTrailerButtonClick,
  bannerWidth,
  basePath,
  filmType,
}) => {
  const { user } = useAuth();
  if (!items || items.length === 0) return null;

  // changed code: lightweight sensible defaults optimized for smoother swiping
  const defaultSettings = {
    speed: 600, // ms transition speed
    grabCursor: true,
    freeMode: true,
    watchOverflow: true,
    slidesPerView: "auto",
    spaceBetween: settings?.spaceBetween ?? 20,
    // keep existing autoplay/navigation/pagination if provided
  };

  const mergedSettings = { ...defaultSettings, ...(settings || {}) };

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel, FreeMode]}
      {...mergedSettings}
      // changed code: add a small class so the Swiper container uses GPU transforms where appropriate
      className="will-change-transform transform-gpu"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          {/* changed code: wrap item in a GPU-accelerated container with eased transition for smoother feel */}
          <div className="will-change-transform transform-gpu transition-transform duration-400 ease-out touch-pan-y">
            {bannerWidth === "w1280" ? (
              <HeroCarouselItem
                bannerWidth={bannerWidth}
                onTrailerButtonClick={onTrailerButtonClick}
                key={item.id}
                item={item}
                filmType={filmType}
                basePath={basePath}
              />
            ) : (
              <CarouselItem
                basePath={basePath}
                bannerWidth={bannerWidth}
                key={item.id}
                item={item}
                filmType={filmType}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
