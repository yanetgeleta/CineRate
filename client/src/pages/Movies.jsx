import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Button from "../components/Button";
import FilterAndSort from "../components/FilterAndSort";
import GenresFilter from "../components/GenresFilter";
import Slider from "@mui/material/Slider";
import { ClipLoader } from "react-spinners";
import Pagination from "@mui/material/Pagination";
import FilmItem from "../components/FilmItem";
import PaginationItem from "@mui/material/PaginationItem";

// This is dedicated page just for movies\
// year=1999&sort_by=popularity.desc&without_genres=action'
const Movies = () => {
  //   const [params, setParams] = useState({ year: null, sortBy: null });
  const currentYear = new Date().getFullYear();
  const [genre, setGenre] = useState(null);
  const [year, setYear] = useState(currentYear);
  const [sortBy, setSortBy] = useState(null);
  const [genreID, setGenreID] = useState(null);
  const [moviesData, setMoviesData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const smallBannerWidth = "w300";

  useEffect(() => {
    async function genreIdGetter() {
      if (genre) {
        const genreIdResponse = await fetch(
          `/api/tmdb/genre/id?filmType=movie&genre=${genre}`,
        );
        const genreIdData = await genreIdResponse.json();

        setGenreID(genreIdData.genreId);
      }
    }
    genreIdGetter();
  }, [genre]);
  useEffect(() => {
    setPage(1);
  }, [genre, year, sortBy]);
  useEffect(() => {
    if (genre && !genreID) setLoading[true];
    async function moviesDataGetter() {
      setLoading(true);
      try {
        const values = { filmType: "movie", pageValue: page };
        if (genreID) values.genreIdValue = genreID;
        if (year) values.yearValue = year;
        if (sortBy) values.sortByValue = sortBy;

        const params = new URLSearchParams(values);
        const response = await fetch(`/api/tmdb/discover/film?${params}`);
        if (!response.ok) {
          setLoading[false];
          throw new Error("Failed to fetch movies for movies page!");
        }
        const responseData = await response.json();
        setMoviesData(responseData);
      } catch (err) {
        console.log(
          new Error("Error trying to fetch for discover movies"),
          err.message,
        );
      } finally {
        setLoading(false);
      }
    }
    moviesDataGetter();
  }, [genreID, year, sortBy, page]);

  return (
    <section className="mt-20 flex gap-8 w-full max-w-7xl md:mx-10 px-8">
      {/* <Navbar /> */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 flex flex-col gap-6">
          <h2 className="text-xl font-semibold ml-2 -mb-2">
            Filter &amp; Sort
          </h2>
          {/* Issues on this page so far:
            I want sort filter to come after the genre and other query so the data will be the same

            */}
          <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-[#222a3d]/60 p-4 dark:border-slate-800 dark:bg-slate-900">
            <FilterAndSort
              onSortChange={(sortByValue) => {
                setSortBy(sortByValue);
              }}
              currentSortValue={sortBy}
              filmType="movie"
            />
            <h2>Genres</h2>
            <GenresFilter
              onGenreChange={(genreValue) => {
                setGenre(genreValue);
              }}
              currentGenreValue={genre}
              filmType="movie"
            />
            <h2>Release Year</h2>
            <Slider
              defaultValue={year}
              valueLabelDisplay="auto"
              aria-label="Year Filter"
              step={1}
              shiftStep={10}
              min={1878}
              max={currentYear}
              onChangeCommitted={(event, newValue) => {
                setYear(newValue);
              }}
            />
            <button
              onClick={() => {
                setSortBy(null);
                setYear(currentYear);
                setGenre(null);
                setGenreID(null);
              }}
              className="hover:underline decoration-[#ADC6FF] underline-offset-2"
            >
              Reset
            </button>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col gap-6">
        {/* Pagination should go down later */}
        {loading ? (
          <div className="flex grow items-center justify-center w-full min-h-[60vh] mb-8">
            <ClipLoader
              loading={loading}
              aria-label="Loading Movies Spinner"
              data-testid="loader"
              color="white"
            />
          </div>
        ) : (
          <div className="relative">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] my-5">
              Browse Movies
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
              {moviesData &&
                moviesData.results.map((movie) => {
                  return (
                    <FilmItem
                      basePosterPath={basePosterPath}
                      smallBannerWidth={smallBannerWidth}
                      filmType="movie"
                      key={movie.id}
                      film={movie}
                    />
                  );
                })}
            </div>
            {/* The film cards obviously will be looped through */}
            {/* We need a pagination */}
          </div>
        )}
        <div className="flex justify-center items-center pt-8">
          <Pagination
            onChange={(e, value) => {
              setPage(value);
            }}
            page={page}
            // variant="outlined"
            count={10}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#222a3d",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#31394d",
                    },
                  },
                  "&:not(.Mui-selected)": {
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#262348",
                  },
                }}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
};
export default Movies;
