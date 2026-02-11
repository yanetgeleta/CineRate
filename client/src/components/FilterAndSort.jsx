import React from "react";
import ComboBox from "./ComboBox";

const FilterAndSort = (props) => {
  const movieSorting = [
    // desc, desc,desc, desc, asc, asc
    { name: "Select soring method", query: "", hidden: true },
    { name: "Popularity", query: "popularity.desc", hidden: false },
    { name: "Release Date", query: "release_date.desc", hidden: false },
    { name: "Revenue", query: "revenue.desc", hidden: false },
    {
      name: "Primary Release Date",
      query: "primary_release_date.desc",
      hidden: false,
    },
    { name: "Original Title", query: "original_title.desc", hidden: false },
  ];
  const tvSorting = [
    { name: "Select sorting method", query: "", hidden: true },
    { name: "Popularity", query: "popularity.desc", hidden: false },
    { name: "First Air Date", query: "first_air_date.desc", hidden: false },
    { name: "Vote Average", query: "vote_average.desc", hidden: false },
    { name: "Vote Count", query: "vote_count.desc", hidden: false },
    { name: "Name", query: "name.asc", hidden: false },
  ];
  const sorting = props.filmType === "movie" ? movieSorting : tvSorting;

  // Original Title is always better than title
  // Maybe make your own api for vote count and average vote
  // This is for movies, may have to implement another one for shows
  return (
    <div>
      <ComboBox
        onChange={props.onSortChange}
        label="Sort Method"
        name="sort"
        options={sorting}
        currentValue={props.currentSortValue}
      />
    </div>
  );
};

export default FilterAndSort;
