import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Button from "../components/Button";
import FilterAndSort from "../components/FilterAndSort";
import FilmCard from "../components/FilmCard";
import GenresFilter from "../components/GenresFilter";
import AddIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";
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
  const [page, setPage] = useState(null);
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
    if (genre && !genreID) return;
    async function moviesDataGetter() {
      setLoading(true);
      const values = {
        genreIdValue: genreID,
        yearValue: year,
        sortByValue: sortBy,
        filmType: "movie",
        pageVAlue: page,
      };
      const params = new URLSearchParams(values);
      const response = await fetch(`/api/tmdb/discover/film?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies for movies page!");
      }
      const responseData = await response.json();
      setMoviesData(responseData);
      console.log(response);
      setLoading(false);
    }
    moviesDataGetter();
  }, [genreID, year, sortBy, page]);
  if (loading) return <div>Loading movies...</div>;
  return (
    <div>
      <Navbar />
      <h2>Filter & Sort</h2>
      {/* Issues on this page so far:
            Doesn't load movie data as soon as the page loads
            both filter and genre should have a none option
            the selected value is not persisting between loads*/}
      <FilterAndSort
        onSortChange={(sortByValue) => {
          setSortBy(sortByValue);
        }}
      />
      <h2>Genres</h2>
      <GenresFilter
        onGenreChange={(genreValue) => {
          setGenre(genreValue);
        }}
      />
      {/* It should automatically apply the filters instead of waiting for the buttons to be pressed */}
      {/* <Button>Apply Filters</Button> */}
      {/* Add a listener for the Slider */}
      <Slider
        defaultValue={2026}
        valueLabelDisplay="auto"
        aria-label="Year Filter"
        step={1}
        shiftStep={10}
        min={1878}
        max={2026}
      />
      <Button
        onClearButton={() => {
          setSortBy(null);
          setYear(null);
          setGenre(null);
        }}
      >
        Clear all
      </Button>
      <h1>Browse Movies</h1>

      {moviesData &&
        moviesData.results.map((movie) => {
          return (
            <div>
              <FilmCard
                src={`${basePosterPath}${smallBannerWidth}${movie.poster_path}`}
              />
              <p>{movie.vote_average}</p>
              {/* the vote average will be replaced by my own */}
              <AddIcon />
              <p>{movie.title}</p>
            </div>
          );
        })}

      {/* The film cards obviously will be looped through */}
      {/* We need a pagination */}
    </div>
  );
};
export default Movies;
