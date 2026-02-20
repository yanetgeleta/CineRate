import React from "react";

function FilmDetailsComp({ filmData }) {
  // const filmGenres = filmData.genres;
  const cast = filmData.credits.cast;
  const crew = filmData.credits.crew;
  const directorObj = crew.find((item) => {
    return item.job === "Director";
  });
  const writerObj = crew.find((item) => {
    return item.job === "Writer" || item.job === "Novel";
  });
  const topCast = cast.slice(0, 5);
  return (
    <div>
      <h1>Synopsis</h1>
      <p>{filmData.overview}</p>
      <h3>Director</h3>
      <p>{directorObj && directorObj.name}</p>
      <h3>Writer</h3>
      <p>{writerObj && writerObj.name}</p>
      <h3>Studio</h3>
      {filmData.production_companies.map((studio, index) => {
        return <p>{studio.name} </p>;
      })}
      {/* Each button will render its respective information */}
      <h3>Cast</h3>
      {topCast.map((actor, index) => {
        return (
          <div>
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
  );
}
export default FilmDetailsComp;
