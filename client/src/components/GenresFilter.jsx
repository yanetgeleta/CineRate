import React from "react";
import ComboBox from "./ComboBox";

const GenresFilter = (props) => {
  const genres = [
    { name: "Action", query: "action" },
    { name: "Adventure", query: "adventure" },
    { name: "Animation", query: "animation" },
    { name: "Comedy", query: "comedy" },
    { name: "Crime", query: "crime" },
    { name: "Documentary", query: "documentary" },
    { name: "Drama", query: "drama" },
    { name: "Family", query: "family" },
    { name: "Fantasy", query: "fantasy" },
    { name: "History", query: "history" },
    { name: "Horror", query: "horror" },
    { name: "Music", query: "music" },
    { name: "Mystery", query: "mystery" },
    { name: "Romance", query: "romance" },
    { name: "Science Fiction", query: "science_fiction" },
    { name: "TV Movie", query: "tv_movie" },
    { name: "Thriller", query: "thriller" },
    { name: "War", query: "war" },
    { name: "Western", query: "western" },
  ];

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
