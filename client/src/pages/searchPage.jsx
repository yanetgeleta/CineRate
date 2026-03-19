import React from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilmItem from "../components/FilmItem";
import { ClipLoader } from "react-spinners";

const SearchPage = () => {
  // query params: query, page
  const [page, setPage] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();
  const searchQuery = searchParam.get("q");

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const smallBannerWidth = "w300";

  const [searchData, setSearchData] = useState();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        // gets the data from the backend
        setLoading(true);
        const params = new URLSearchParams({ query: searchQuery, page: page });
        const searchRes = await fetch(`/api/tmdb/search?${params}`);
        const searchResData = await searchRes.json();

        // remove all the data that is not movie or show (person)
        const filmsAndMovies = searchResData.results.filter((r) => {
          return r.media_type !== "person";
        });
        setSearchData(filmsAndMovies);
      } catch (err) {
        setLoading(false);
        throw new Error("Error trying to search films from the backend");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResult();
  }, [searchQuery, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParam({ q: inputValue });
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSearch}>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>
      {loading ? (
        <ClipLoader
          loading={loading}
          aria-label="Loading Movies Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <div className="grid grid-cols-5 gap-4 p-4">
            {searchData &&
              searchData.map((film, index) => {
                return (
                  <FilmItem
                    key={film.id}
                    film={film}
                    filmType={film.media_type}
                    basePosterPath={basePosterPath}
                    smallBannerWidth={smallBannerWidth}
                  />
                );
              })}
          </div>
          <Pagination
            count={5}
            color="primary"
            onChange={(e, value) => {
              setPage(value);
            }}
            page={page}
          />
        </div>
      )}
    </div>
  );
};
export default SearchPage;
