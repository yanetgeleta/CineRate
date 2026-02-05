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
  const currentYear = new Date().getFullYear;
  const [genre, setGenre] = useState(null);
  const [year, setYear] = useState(currentYear);
  const [sortBy, setSortBy] = useState(null);
  const [genreID, setGenreId] = useState(null);
  const [moviesData, setMoviesData] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(async () => {
    if (genre) {
      genreIdData = await fetch(
        `/api/tmdb/genre/id?filmType=movie&genre=${genre}`,
      );
      setGenreId(genreIdData.genreId);
    }
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
    const responseData = response.json();
    setMoviesData(responseData);
    console.log(response);
  }, [genre, year, sortBy, page]);

  return (
    <div>
      <Navbar />
      <h2>Filter & Sort</h2>
      {/* Tomorrow activities
            use target to find the values for the clicked values from Combobox
            Populate the page with the posters we get from the movie database
            Check if we still don't need apply filters button and the page updates automatically */}
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
      {moviesData.results.map((movie) => {
        return (
          <div>
            <FilmCard src={movie.poster_path} />
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
