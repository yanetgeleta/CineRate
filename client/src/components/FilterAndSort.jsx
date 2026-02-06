import React from "react";
import ComboBox from "./ComboBox";

const FilterAndSort = (props) => {
  const sorting = [
    // desc, desc,desc, desc, asc, asc
    { name: "Popularity", query: "popularity" },
    { name: "Release Date", query: "release_date" },
    { name: "Revenue", query: "revenue" },
    { name: "Primary Release Date", query: "primary_release_date" },
    { name: "Original Title", query: "original_title" },
    { name: "Title", query: "title" },
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
