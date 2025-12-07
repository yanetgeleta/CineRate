import React from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import FilterAndSort from "../components/FilterAndSort";
import Genres from "../components/Genres";
import MovieCard from "../components/movieCard";
// This is dedicated page just for movies
const Movies = ()=> {
    return (
        <div>
            <Navbar />
            <h2>Filter & Sort</h2>
            <Button name="Clear All" />
            <FilterAndSort />
            <h2>Genres</h2>
            <Genres />
            <h1>Browse Movies</h1>
            <MovieCard />
            {/* We will loop through the data we get from our api */}
        </div>
    );
}
export default Movies;