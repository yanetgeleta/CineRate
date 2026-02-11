import React, { useEffect } from "react";
import Navbar from "../layouts/Navbar";
import Input from "../components/Input";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import GenresFilter from "../components/GenresFilter";
import AddIcon from "@mui/icons-material/Add";
import FilterAndSort from "../components/FilterAndSort";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";
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
      {/* Genres not working: war and politics, action and adventure, sci-fi and fantasy */}
      <h2>Genres</h2>
      <GenresFilter
        onGenreChange={(genreValue) => {
          setGenre(genreValue);
        }}
        currentGenreValue={genre}
        filmType="tv"
      />
      <Button>Reset</Button>
      {loading ? (
        <ClipLoader
          loading={loading}
          data-testid="loader"
          aria-label="Loading shows spinner"
        />
      ) : (
        <div>
          <h1>Browse Tv Shows</h1>
          <div className="grid grid-cols-5 gap-4 p-4">
            {showData &&
              showData.results.map((show) => (
                /* 2. THE ITEM: Each child automatically fills one grid cell */
                <div
                  key={show.id}
                  className="flex flex-col border border-gray-200 rounded p-2"
                >
                  <FilmCard
                    src={`${basePosterPath}${smallBannerWidth}${show.poster_path}`}
                  />

                  <div className="mt-2">
                    <p className="font-bold">{show.name}</p>
                    <p className="text-sm text-gray-600 italic">
                      Rating: {show.vote_average}
                      {/* Shall change the vote average to be my own calculated from users */}
                    </p>
                    <BookmarkAddOutlinedIcon />
                    <VisibilityOutlinedIcon />
                    <FavoriteBorderOutlinedIcon />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <Pagination
        onChange={(e, value) => {
          setPage(value);
        }}
        page={page}
        count={10}
        color="primary"
      />

      {/* The film cards obviously will be looped through */}
      {/* We need to add a navigation for next pages, a numbered one */}
    </div>
  );
};
export default Shows;
