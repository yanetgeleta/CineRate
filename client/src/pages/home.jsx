import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import Carousel from "../components/Carousel";
// This is the home page that users see when they search for site

function Home() {
  const [trendingToday, setTrendingToday] = useState(null);
  const [trendingWeekly, setTrendingWeekly] = useState(null);
  const [newMovies, setNewMovies] = useState(null);
  const [topMovies, setTopMovies] = useState(null);
  const [topShows, setTopShows] = useState(null);
  const [trailerURL, setTrailerURL] = useState(null);

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // dont forget to replace these variables with values from dotenv
  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const youtubeSearchBase = "https://www.youtube.com/watch?v=";
  const tmdbMovieBase = "https://api.themoviedb.org/3/movie/";

  const heroBannerSettings = {
    direction: "horizontal",
    // threshold: 100,
    // touchRatio: 0.5,
    // shortSwipes: false,
    // longSwipesRatio: 0.7,
    spaceBetween: 0,
    slidesPerView: 1,
    // pagination: { clickable: true },
    // autoplay: { delay: 5000 },
    mousewheel: { enabled: true, forceToAxis: true },
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
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
          fetch("/api/tmdb/trending/today"),
          fetch("/api/tmdb/trending/weekly"),
          fetch("/api/tmdb/new/movies"),
          fetch("/api/tmdb/top/movies"),
          fetch("/api/tmdb/top/shows"),
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
        console.log(trendingToday);
      } catch (err) {
        console.log("Failed to fetch home data from backend: ", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  async function trailerButtonHandler(e) {
    const buttonValue = e.currentTarget.value;
    console.log(buttonValue);
    const videosPath = `${tmdbMovieBase}${buttonValue}/videos`;

    try {
      const response = await fetch(videosPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const movieIndex = result.results.findIndex((item) => {
        return item.type === "Trailer";
      });
      setTrailerURL(`${youtubeSearchBase}${result.results[movieIndex].key}`);
    } catch (err) {
      console.log(err);
    }
    // setTrailerURL(`${tmdbMovieBase}${buttonValue}/videos`);
  }

  if (loading) return <div>Loading films...</div>;

  return (
    <div>
      <Navbar />
      {/* Banner for trending movies and shows daily */}
      <Carousel
        onClick={trailerButtonHandler}
        bannerWidth={heroBannerWidth}
        basePath={basePosterPath}
        items={trendingToday?.results}
        settings={heroBannerSettings}
      />

      <h2>Trending</h2>
      <Carousel
        bannerWidth={smallBannerWidth}
        basePath={basePosterPath}
        items={trendingWeekly?.results}
        settings={posterSettings}
      />
      {/* Multiple data will come here from weeky, trending movies and shows will be shows here */}
      <h2>New Releases</h2>
      <Carousel
        bannerWidth={smallBannerWidth}
        basePath={basePosterPath}
        items={newMovies?.results}
        settings={posterSettings}
      />
      {/* Multiple data will come for newly releases movies */}
      <h2>Top Rated Movies</h2>
      <Carousel
        bannerWidth={smallBannerWidth}
        basePath={basePosterPath}
        items={topMovies?.results}
        settings={posterSettings}
      />
      <h2>Top Rated Shows</h2>
      <Carousel
        bannerWidth={smallBannerWidth}
        basePath={basePosterPath}
        items={topShows?.results}
        settings={posterSettings}
      />
      {/* Multiple films from topMovies and topShows */}
    </div>
  );
}

export default Home;
