import React, { useEffect } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import GenresFilter from "../components/GenresFilter";
import FilterAndSort from "../components/FilterAndSort";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import FilmItem from "../components/FilmItem";
import PaginationItem from "@mui/material/PaginationItem";
// This is a dedicated page for shows
const Shows = () => {
  // const currentYear = new Date().getFullYear();
  const [genre, setGenre] = useState(null);
  const [genreID, setGenreID] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  // const [year, setYear] = useState(currentYear);
  const [showData, setShowData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [isFavorited, setIsFavorited] = useState(null);

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const smallBannerWidth = "w300";

  useEffect(() => {
    async function genreIdGetter() {
      if (genre) {
        const genreIdResponse = await fetch(
          `/api/tmdb/genre/id?filmType=tv&genre=${genre}`,
        );
        const genreIdData = await genreIdResponse.json();

        setGenreID(genreIdData.genreId);
      }
    }
    genreIdGetter();
  }, [genre]);

  useEffect(() => {
    setPage(1);
  }, [genre, sortBy]);

  useEffect(() => {
    if (genre && !genreID) setLoading[true];
    async function tvDataGetter() {
      setLoading(true);
      try {
        const values = { filmType: "tv", pageValue: page };
        if (genreID) values.genreIdValue = genreID;
        if (sortBy) values.sortByValue = sortBy;

        const params = new URLSearchParams(values);
        const response = await fetch(`/api/tmdb/discover/film?${params}`);
        if (!response.ok) {
          setLoading[false];
          throw new Error("Failed to fetch shows for movies page!");
        }
        const responseData = await response.json();
        setShowData(responseData);
      } catch (err) {
        console.log(
          new Error("Error trying to fetch for discover shows"),
          err.message,
        );
      } finally {
        setLoading(false);
      }
    }
    tvDataGetter();
  }, [genreID, sortBy, page]);

  return (
    <section className="mt-20 flex gap-8 w-full max-w-7xl md:mx-20">
      <aside className="hidden w-64 flex-shrink-0 lg:block">
        <div className="sticky top-24 flex flex-col gap-6">
          <h2 className="text-xl font-semibold ml-2 mb-[-.5rem]">
            Filter & Sort
          </h2>
          <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-[#222a3d]/60 p-4 dark:border-slate-800 dark:bg-slate-900">
            <FilterAndSort
              onSortChange={(sortByValue) => {
                setSortBy(sortByValue);
              }}
              currentSortValue={sortBy}
              filmType="tv"
            />
            {/* Genres not working: war and politics, action and adventure, sci-fi and fantasy */}
            <h2>Genres</h2>
            <GenresFilter
              onGenreChange={(genreValue) => {
                setGenre(genreValue);
              }}
              currentGenreValue={genre}
              filmType="tv"
            />
            <button
              onClick={() => {
                setSortBy(null);
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
        {loading ? (
          <div className="flex flex-grow items-center justify-center w-full min-h-[60vh] mb-8">
            <ClipLoader
              loading={loading}
              data-testid="loader"
              aria-label="Loading shows spinner"
              color="white"
            />
          </div>
        ) : (
          <div className="relative">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] my-5">
              Browse Tv Shows
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
              {showData &&
                showData.results.map((show) => (
                  /* 2. THE ITEM: Each child automatically fills one grid cell */
                  <FilmItem
                    basePosterPath={basePosterPath}
                    smallBannerWidth={smallBannerWidth}
                    film={show}
                    filmType="tv"
                    key={show.id}
                  />
                ))}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center pt-8">
          <Pagination
            onChange={(e, value) => {
              setPage(value);
            }}
            page={page}
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

      {/* The film cards obviously will be looped through */}
      {/* We need to add a navigation for next pages, a numbered one */}
    </section>
  );
};
export default Shows;
