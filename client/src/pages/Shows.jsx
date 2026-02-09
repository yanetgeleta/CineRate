import React from "react";
import Navbar from "../layouts/Navbar";
import Input from "../components/Input";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import GenresFilter from "../components/GenresFilter";
import AddIcon from "@mui/icons-material/Add";
import FilterAndSort from "../components/FilterAndSort";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
// This is a dedicated page for shows
const Shows = () => {
  const [genre, setGenre] = useState(null);
  const [genreID, setGenreID] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [year, setYear] = useState(currentYear);
  const [showData, setShowData] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
  }, [genre, year]);
  useEffect(() => {
    if (genre && !genreID) setLoading[true];
    async function tvDataGetter() {
      setLoading(true);
      try {
        const values = { filmType: "tv", pageValue: page };
        if (genreID) values.genreIdValue = genreID;
        if (year) values.yearValue = year;
        if (sortBy) values.sortByValue = sortBy;

        const params = new URLSearchParams(values);
        const response = await fetch(`/api/tmdb/discover/film?${params}`);
        if (!response.ok) {
          setLoading[false];
          throw new Error("Failed to fetch shows for movies page!");
        }
        const responseData = await response.json();
        setMoviesData(responseData);
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
  }, [genreID, year, sortBy, page]);

  return (
    <div>
      <Navbar />
      <h2>Filter & Sort</h2>
      <FilterAndSort
        onSortChange={(sortByValue) => {
          setSortBy(sortByValue);
        }}
        currentSortValue={sortBy}
        filmType="tv"
      />
      <h2>Genres</h2>
      <GenresFilter
        onGenreChange={(genreValue) => {
          setGenre(genreValue);
        }}
        currentGenreValue={genre}
        filmType="tv"
      />
      <h2>Number of Seasons</h2>
      <Input />
      <Input />
      <Button name="Reset" />
      <h1>Browse Tv Shows</h1>
      <FilmCard />
      <p>8.5</p>
      <AddIcon />
      <p>Title</p>
      {/* The film cards obviously will be looped through */}
      {/* We need to add a navigation for next pages, a numbered one */}
    </div>
  );
};
export default Shows;
