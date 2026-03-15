import React from "react";
import FilmCard from "./FilmCard";
import Rating from "@mui/material/Rating";

function ProfileFilms({ posterBase, list }) {
  return (
    <div>
      {list.map((film, index) => {
        return (
          <div key={film.tmdb_id}>
            <FilmCard src={`${posterBase}${film.poster_path}`} />
            <p>{film.title}</p>
            {/* for the movies the user has rated */}
            {/* <Rating readOnly value={}/> */}
          </div>
        );
      })}
    </div>
  );
}

export default ProfileFilms;
