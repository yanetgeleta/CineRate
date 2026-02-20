import React, { act } from "react";
import Avatar from "@mui/material/Avatar";

function FilmCastCrewComp({ filmCredits }) {
  const cast = filmCredits.cast;
  const crew = filmCredits.crew;

  return (
    <div>
      <h3>Cast</h3>
      {cast.map((actor) => {
        return (
          <div key={actor.id}>
            {/* https://image.tmdb.org/t/p/w780/ */}
            <img
              src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
            />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </div>
        );
      })}
      <h3>Crew</h3>
      {crew.map((c) => {
        return (
          <div key={c.id}>
            {/* https://image.tmdb.org/t/p/w780/ */}
            <img src={`https://image.tmdb.org/t/p/w185/${c.profile_path}`} />
            <p>{c.name}</p>
            <p>{c.job}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FilmCastCrewComp;
