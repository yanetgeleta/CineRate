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
  return (
    <div>
      <h1>Synopsis</h1>
      <p>{filmData.overview}</p>
      <h3>Director</h3>
      <p>{directorObj && directorObj.name}</p>
      <h3>Writer</h3>
      <p>{writerObj && writerObj.name}</p>
      <h3>Studio</h3>
      {movieData.production_companies.map((studio, index) => {
        return <p>{studio.name} </p>;
      })}
      {/* Each button will render its respective information */}
    </div>
  );
}
export default FilmDetailsComp;
