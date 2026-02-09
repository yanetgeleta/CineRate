import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import Button from "../components/Button";
import FilterAndSort from "../components/FilterAndSort";
import FilmCard from "../components/FilmCard";
import GenresFilter from "../components/GenresFilter";
import AddIcon from "@mui/icons-material/Add";
import Slider from "@mui/material/Slider";
import { ClipLoader } from "react-spinners";

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
    if (genre && !genreID) setLoading[true];
    async function moviesDataGetter() {
      setLoading(true);
      try {
        const values = { filmType: "movie" };
        if (genreID) values.genreIdValue = genreID;
        if (year) values.yearValue = year;
        if (sortBy) values.sortByValue = sortBy;
        if (page) values.pageValue = page;
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
    <div>
      <Navbar />
      <h2>Filter & Sort</h2>
      {/* Issues on this page so far:
            clear all not working
            I want sort filter to come after the genre and other query so the data will be the same
            */}
      <FilterAndSort
        onSortChange={(sortByValue) => {
          setSortBy(sortByValue);
        }}
        currentSortValue={sortBy}
      />
      <h2>Genres</h2>
      <GenresFilter
        onGenreChange={(genreValue) => {
          setGenre(genreValue);
        }}
        currentGenreValue={genre}
      />
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
      <Button
        onClick={() => {
          setSortBy(null);
          setYear(null);
          setGenre(null);
          setGenreID(null);
        }}
      >
        Clear all
      </Button>
      {loading ? (
        <ClipLoader
          loading={loading}
          aria-label="Loading Movies Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
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
      )}
    </div>
  );
};
export default Movies;
