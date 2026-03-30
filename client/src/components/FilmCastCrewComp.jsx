import React, { act } from "react";
import Avatar from "@mui/material/Avatar";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

function FilmCastCrewComp({ filmCredits }) {
  const cast = filmCredits.cast;
  const crew = filmCredits.crew;

  const avatar = createAvatar(pixelArt, {
    seed: "John Doe",
  });

  const profilePlaceholder = avatar.toDataUri();

  return (
    <div className="py-6 flex flex-col gap-8">
      <h3 className="text-xl font-bold mb-4">Cast</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {cast.map((actor) => {
          return (
            <div
              className="flex flex-col items-center text-center"
              key={actor.id}
            >
              {/* https://image.tmdb.org/t/p/w780/ */}
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                    : profilePlaceholder
                }
                className="w-30 h-30 object-cover rounded-full mb-2"
              />
              <p className="font-semibold text-sm">{actor.name}</p>
              <p className="text-[#dae2fd]/60 text-xs">{actor.character}</p>
            </div>
          );
        })}
      </div>

      <h3 className="text-xl font-bold mb-4">Crew</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {crew.map((c) => {
          return (
            <div className="flex flex-col items-center text-center" key={c.id}>
              {/* https://image.tmdb.org/t/p/w780/ */}
              <img
                className="w-30 h-30 object-cover rounded-full mb-2"
                src={
                  c.profile_path
                    ? `https://image.tmdb.org/t/p/w185/${c.profile_path}`
                    : profilePlaceholder
                }
              />
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-[#dae2fd]/60 text-xs">{c.job}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilmCastCrewComp;
