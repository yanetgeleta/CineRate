import React from "react";
import ComboBox from "./ComboBox";

const FilterAndSort = (props) => {
  const sorting = [
    "Popularity",
    "Release Date",
    "Revenue",
    "Primary Release Date",
    "Original Title",
    "Title",
  ];
  // Original Title is always better than title
  // Maybe make your own api for vote count and average vote
  // This is for movies, may have to implement another one for shows
  return (
    <div>
      <ComboBox
        onChange={props.onSortChange}
        label="Sort By"
        name="sort"
        options={sorting}
      />
    </div>
  );
};

export default FilterAndSort;
