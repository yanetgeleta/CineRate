import React from "react";
import ComboBox from "./ComboBox";

const FilterAndSort = (props) => {
  const sorting = [
    // desc, desc,desc, desc, asc, asc
    { name: "Select soring method", query: "", hidden: true },
    { name: "Popularity", query: "popularity", hidden: false },
    { name: "Release Date", query: "release_date", hidden: false },
    { name: "Revenue", query: "revenue", hidden: false },
    {
      name: "Primary Release Date",
      query: "primary_release_date",
      hidden: false,
    },
    { name: "Original Title", query: "original_title", hidden: false },
    { name: "None", query: "", hidden: false },
  ];

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
