import React from "react";
import ComboBox from "./ComboBox";

const FilterAndSort = ()=> {
    const sorting = ["Popularity", "Release Date", "Rating", "Alpabetical"];
    return (
        <div>
            <ComboBox label="Sort By" name="sort" options={sorting} />
            
        </div>
    )
}

export default FilterAndSort;