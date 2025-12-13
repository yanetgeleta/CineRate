import React from "react";
import Navbar from "../layouts/Navbar";
import Button from "../components/Button";
import FilterAndSort from "../components/FilterAndSort";
import FilmCard from "../components/FilmCard";
import GenresFilter from "../components/GenresFilter";
import AddIcon from '@mui/icons-material/Add';
// This is dedicated page just for movies
const Movies = ()=> {
    return (
        <div>
            <Navbar />
            <h2>Filter & Sort</h2>
            <FilterAndSort />
            <h2>Genres</h2>
            <GenresFilter />
            <Button name="Apply Filters" />
            <Button name="Reset" />
            <h1>Browse Movies</h1>

            <FilmCard />
            <p>8.7</p>
            <AddIcon />
            <p>Title</p>
            
            {/* The film cards obviously will be looped through */}
            {/* We need to add a navigation for next pages, a numbered one */}
        </div>
    );
}
export default Movies;