import React, { useEffect, useRef, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import Carousel from "../components/Carousel";
import Trailer from "../components/Video";
import { ClipLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// This is the home page that users see when they search for site

function Home() {
  const [trendingToday, setTrendingToday] = useState(null);
  const [trendingWeekly, setTrendingWeekly] = useState(null);
  const [newMovies, setNewMovies] = useState(null);
  const [topMovies, setTopMovies] = useState(null);
  const [topShows, setTopShows] = useState(null);
  const [trailerURL, setTrailerURL] = useState(null);
  const playerRef = useRef(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  // const youtubeSearchBase = "https://www.youtube.com/watch?v=";
  const tmdbMovieBase = "https://api.themoviedb.org/3/movie/";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const heroBannerSettings = {
    direction: "horizontal",
    // threshold: 100,
    // touchRatio: 0.5,
    // shortSwipes: false,
    // longSwipesRatio: 0.7,
    spaceBetween: 0,
    slidesPerView: 1,
    // pagination: { clickable: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    mousewheel: { enabled: true, forceToAxis: true },
    // disableOnInteraction: false,
    // pauseOnMouseEnter: true,
    // have a class name for a tailwind design
  };
  const posterSettings = {
    direction: "horizontal",
    spaceBetween: 20,
    slidesPerView: 5,
    breakpoints: {
      320: { slidesPerView: 2 },
      640: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    },
    mousewheel: { enabled: true, forceToAxis: true },
  };
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{ src: trailerURL, type: "video/youtube" }],
  };

  // fetches data from the backend for the home page
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [
          trendingTodayRes,
          trendingWeeklyRes,
          newMoviesRes,
          topMoviesRes,
          topShowsRes,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/api/tmdb/trending/today`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/api/tmdb/trending/weekly`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/api/tmdb/new/movies`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/api/tmdb/top/movies`, {
            credentials: "include",
          }),
          fetch(`${API_BASE_URL}/api/tmdb/top/shows`, {
            credentials: "include",
          }),
        ]);
        if (
          !trendingTodayRes.ok ||
          !trendingWeeklyRes.ok ||
          !newMoviesRes.ok ||
          !topMoviesRes.ok ||
          !topShowsRes.ok
        )
          throw new Error("Failed to fetch home data");
        const [
          trendingTodayData,
          trendingWeeklyData,
          newMoviesData,
          topMoviesData,
          topShowsData,
        ] = await Promise.all([
          trendingTodayRes.json(),
          trendingWeeklyRes.json(),
          newMoviesRes.json(),
          topMoviesRes.json(),
          topShowsRes.json(),
        ]);
        setTrendingToday(trendingTodayData);
        setTrendingWeekly(trendingWeeklyData);
        setNewMovies(newMoviesData);
        setTopMovies(topMoviesData);
        setTopShows(topShowsData);
      } catch (err) {
        console.log("Failed to fetch home data from backend: ", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  async function trailerButtonHandler(values) {
    // const buttonValue = e.currentTarget.value;
    const params = new URLSearchParams(values);
    const trailerPath = `${API_BASE_URL}/api/tmdb/trailer?${params}`;
    // console.log(buttonValue);
    // I think the movie Id is not being sent as params
    try {
      const response = await fetch(trailerPath);
      const data = await response.json();
      if (response.ok) {
        if (data.TrailerURL) {
          setTrailerURL(data.TrailerURL);
          setIsPlayerOpen(true);
        } else {
          console.log("The back end couldn't find trailer path");
        }
      } else {
        console.log("Couldn't fetch data from the backend");
      }
    } catch (err) {
      console.log(err);
    }
    // Now try calling the Trailer page or somehow the vidoe playinb by connecting them
  }
  function playerOnReady(player) {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });
    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  }

  const carouselData = [
    { title: "Trending", items: trendingWeekly, filmType: null },
    { title: "New Releases", items: newMovies?.results, filmType: "movie" },
    { title: "Top Rated Movies", items: topMovies?.results, filmType: "movie" },
    { title: "Top Rated Shows", items: topShows?.results, filmType: "tv" },
  ];
  return (
    <main className="mt-20 md:mx-10">
      {/* <Navbar /> */}
      {/* Banner for trending movies and shows daily */}
      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
          <ClipLoader
            loading={loading}
            aria-label="Loading Movies Spinner"
            data-testid="loader"
            className="h-screen mt-20"
            color="white"
          />
        </div>
      ) : (
        <div>
          {/* Hero section */}
          <section className="relative w-full overflow-hidden px-8 flex items-end mb-4.5 max-h-170">
            {" "}
            <Carousel
              onTrailerButtonClick={trailerButtonHandler}
              bannerWidth={heroBannerWidth}
              basePath={basePosterPath}
              items={trendingToday}
              settings={heroBannerSettings}
            />
          </section>

          {trailerURL && isPlayerOpen && (
            /* OVERLAY CONTAINER: Fixed to the viewport, z-50 ensures it covers the navbar */
            <div className="fixed inset-0 z-50 w-screen h-screen bg-black/90 flex items-center justify-center">
              {/* CLOSE BUTTON CONTAINER: Positioned absolute to the SCREEN, safely outside the video */}
              {/* Using an arbitrary Tailwind value z-[60] ensures it sits above the video player */}
              <div className="absolute top-6 right-6 z-60">
                <IconButton
                  onClick={() => {
                    setIsPlayerOpen(false);
                    setTrailerURL(null);
                  }}
                  /* Use MUI's sx prop to style the button safely, avoiding Tailwind conflicts on MUI components */
                  sx={{
                    backgroundColor: "white",
                    color: "#fbbf24", // amber-400 equivalent
                    "&:hover": {
                      backgroundColor: "#f3f4f6", // gray-100 on hover
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>

              {/* VIDEO CONTAINER: Centered by the flex parent. 'w-full max-w-5xl' makes it responsive */}
              <div className="w-screen max-w-5xl relative aspect-video shadow-2xl px-4">
                <Trailer
                  options={videoJsOptions}
                  onReady={playerOnReady}
                  trailerURL={trailerURL}
                />
              </div>
            </div>
          )}
          {/* <h2>Your Watchlist</h2> */}

          {carouselData.map((film) => {
            return (
              <section className="px-8">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#dae2fd]">
                    {film.title}
                  </h2>
                  <div class="h-1 w-12 bg-[#adc6ff] mt-2 rounded-full"></div>
                </div>

                <Carousel
                  bannerWidth={smallBannerWidth}
                  basePath={basePosterPath}
                  items={film.items}
                  settings={posterSettings}
                  filmType={film.filmType}
                />
              </section>
            );
          })}
          {/* Multiple films from topMovies and topShows */}
        </div>
      )}
    </main>
  );
}

export default Home;
