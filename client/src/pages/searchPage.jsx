import React from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilmItem from "../components/FilmItem";
import { ClipLoader } from "react-spinners";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PaginationItem from "@mui/material/PaginationItem";

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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        // gets the data from the backend
        setLoading(true);
        const params = new URLSearchParams({ query: searchQuery, page: page });
        const searchRes = await fetch(
          `${API_BASE_URL}/api/tmdb/search?${params}`,
          { credentials: "include" },
        );
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
    <main className="bg-[#0b1326] mt-20 md:mx-10 px-8">
      <div className="my-8">
        <form
          className="relative space-y-6 flex items-center"
          onSubmit={handleSearch}
        >
          <SearchIcon className="absolute left-3 top-3/5 -translate-y-1/2 text-outline" />
          {/* <CloseIcon
            onClick={() => {
              setInputValue("");
            }}
            className="absolute right-6 top-3/5 -translate-y-1/2 text-outline"
          /> */}
          <input
            className="w-full bg-[#060e20] text-[#dae2fd] text-xl font-medium py-6 pl-16 pr-6 rounded-2xl border-none focus:ring-2 focus:ring-[#4d8eff]/30 transition-all duration-300 shadow-xl shadow-black/20 mt-4"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="search"
            id="search"
          />
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
          <ClipLoader
            loading={loading}
            aria-label="Loading Movies Spinner"
            data-testid="loader"
            color="white"
          />
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#dae2fd]">
              Search Results
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10 p-4">
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
          <div className="flex justify-center items-center pt-8">
            <Pagination
              count={5}
              color="primary"
              onChange={(e, value) => {
                setPage(value);
              }}
              page={page}
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
      )}
    </main>
  );
};
export default SearchPage;
