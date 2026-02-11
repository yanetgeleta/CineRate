import React from "react";
import ComboBox from "./ComboBox";

const GenresFilter = (props) => {
  const movieGenres = [
    { name: "Select Genre", query: "", hidden: true },
    { name: "Action", query: "action", hidden: false },
    { name: "Adventure", query: "adventure", hidden: false },
    { name: "Animation", query: "animation", hidden: false },
    { name: "Comedy", query: "comedy", hidden: false },
    { name: "Crime", query: "crime", hidden: false },
    { name: "Documentary", query: "documentary", hidden: false },
    { name: "Drama", query: "drama", hidden: false },
    { name: "Family", query: "family", hidden: false },
    { name: "Fantasy", query: "fantasy", hidden: false },
    { name: "History", query: "history", hidden: false },
    { name: "Horror", query: "horror", hidden: false },
    { name: "Music", query: "music", hidden: false },
    { name: "Mystery", query: "mystery", hidden: false },
    { name: "Romance", query: "romance", hidden: false },
    { name: "Science Fiction", query: "science_fiction", hidden: false },
    { name: "TV Movie", query: "tv_movie", hidden: false },
    { name: "Thriller", query: "thriller", hidden: false },
    { name: "War", query: "war", hidden: false },
    { name: "Western", query: "western", hidden: false },
  ];
  const tvGenres = [
    { name: "Select Genre", query: "", hidden: true },
    { name: "Action & Adventure", query: "action & adventure", hidden: false },
    { name: "Animation", query: "animation", hidden: false },
    { name: "Comedy", query: "comedy", hidden: false },
    { name: "Crime", query: "crime", hidden: false },
    { name: "Documentary", query: "documentary", hidden: false },
    { name: "Drama", query: "drama", hidden: false },
    { name: "Family", query: "family", hidden: false },
    { name: "Kids", query: "kids", hidden: false },
    { name: "Mystery", query: "mystery", hidden: false },
    { name: "News", query: "news", hidden: false },
    { name: "Reality", query: "reality", hidden: false },
    { name: "Sci-Fi & Fantasy", query: "sci-fi & fantasy", hidden: false },
    { name: "Soap", query: "soap", hidden: false },
    { name: "Talk", query: "talk", hidden: false },
    { name: "War & Politics", query: "war & politics", hidden: false },
    { name: "Western", query: "western", hidden: false },
  ];
  const genres = props.filmType === "movie" ? movieGenres : tvGenres;

  return (
    <div>
      <ComboBox
        onChange={props.onGenreChange}
        label="Genres"
        name="genres"
        options={genres}
        currentValue={props.currentGenreValue}
      />
    </div>
  );
};

export default GenresFilter;
