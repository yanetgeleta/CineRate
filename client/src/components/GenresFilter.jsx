import React from "react";
import ComboBox from "./ComboBox";

const GenresFilter = (props) => {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];

  return (
    <div>
      <ComboBox
        onChange={props.onGenreChange}
        label="Genres"
        name="genres"
        options={genres}
      />
    </div>
  );
};

export default GenresFilter;
