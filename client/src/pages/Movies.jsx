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
  const [params, setParams] = useState({ year: null, sortBy: null });
  useEffect(() => {}, []);
  return (
    <div>
      <Navbar />
      <h2>Filter & Sort</h2>
      <FilterAndSort />
      <h2>Genres</h2>
      <GenresFilter />
      {/* It should automatically apply the filters instead of waiting for the buttons to be pressed */}
      {/* <Button>Apply Filters</Button> */}
      <Slider
        defaultValue={2026}
        valueLabelDisplay="auto"
        aria-label="Year Filter"
        step={1}
        shiftStep={10}
        min={1878}
        max={2026}
      />
      <Button>Clear all</Button>
      <h1>Browse Movies</h1>
      <FilmCard />
      <p>8.7</p>
      <AddIcon />
      <p>Title</p>

      {/* The film cards obviously will be looped through */}
      {/* We need to add a navigation for next pages, a numbered one */}
    </div>
  );
};
export default Movies;
