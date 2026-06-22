import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import {
  A11y,
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  EffectFade,
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

  // sensible defaults
  const defaultSettings = {
    speed: 600,
    grabCursor: true,
    watchOverflow: true,
    spaceBetween: settings?.spaceBetween ?? 20,
    // by default allow multiple slides per view (posters) — hero override below
    slidesPerView: settings?.slidesPerView ?? "auto",
    // keep navigation/pagination/autoplay if provided in settings
  };

  const mergedSettings = { ...defaultSettings, ...(settings || {}) };

  // Enforce snapping to full slides for hero banner
  const finalSettings =
    bannerWidth === "w1280"
      ? {
          ...mergedSettings,
          // one full slide at a time
          freeMode: false,
          slidesPerView: 1,
          slidesPerGroup: 1,
          centeredSlides: false,
          // reduce accidental half-swipes
          threshold: 20,
          longSwipesRatio: 0.5,
          shortSwipes: true,
          resistanceRatio: 0,
          // keep autoplay if passed
          autoplay: mergedSettings.autoplay ?? undefined,
        }
      : {
          // keep poster behavior (allow multiple visible)
          ...mergedSettings,
          // ensure snapping by grouping visible slides (prevents half-slide stop on desktop)
          slidesPerGroup:
            mergedSettings.slidesPerView === "auto"
              ? 1
              : mergedSettings.slidesPerView,
          freeMode: false, // disable freeMode so slides snap to grid
        };

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel, EffectFade]}
      {...finalSettings}
      className="will-change-transform transform-gpu"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="will-change-transform transform-gpu transition-transform duration-300 ease-out">
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
