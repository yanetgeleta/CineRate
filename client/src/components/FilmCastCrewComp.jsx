import React, { act } from "react";
import Avatar from "@mui/material/Avatar";

function FilmCastCrewComp({ filmCredits }) {
  const cast = filmCredits.cast;
  const crew = filmCredits.crew;

  return (
    <div>
      <h3>Cast</h3>
      <div className="grid grid-cols-5 gap-4 p-4">
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
      </div>

      <h3>Crew</h3>
      <div className="grid grid-cols-5 gap-4 p-4">
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
    </div>
  );
}

export default FilmCastCrewComp;
