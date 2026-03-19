import React from "react";
import FilmCard from "./FilmCard";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function ProfileFilms({ posterBase, list }) {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {list.map((film, index) => {
        return (
          <div key={film.tmdb_id}>
            <Link
              to={`/${film.film_type === "movie" ? "moviedetail" : "showdetail"}/${film.tmdb_id}`}
            >
              <FilmCard src={`${posterBase}${film.poster_path}`} />
              <p>{film.title}</p>
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
