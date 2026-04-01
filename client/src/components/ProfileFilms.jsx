import React from "react";
import FilmCard from "./FilmCard";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function ProfileFilms({ posterBase, list }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
      {list.map((film, index) => {
        return (
          <div
            className="group relative bg-[#171f33] rounded-xl overflow-hidden hover:bg-[#31394d] transition-all duration-300 transform hover:-translate-y-1"
            key={film.tmdb_id}
          >
            <Link
              to={`/${film.film_type === "movie" ? "moviedetail" : "showdetail"}/${film.tmdb_id}`}
            >
              <div className="aspect-2/3">
                <FilmCard
                  imgClasses={"w-full h-full object-cover"}
                  src={`${posterBase}${film.poster_path}`}
                />
              </div>

              <p className="p-4 text-sm font-bold text-[#dae2fd] line-clamp-1 mb-1">
                {film.title}
              </p>
            </Link>
            {/* for the movies the user has rated */}
            {/* <Rating readOnly value={}/> */}
          </div>
        );
      })}
    </div>
  );
}

export default ProfileFilms;
