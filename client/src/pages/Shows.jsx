import React from "react";
import Navbar from "../layouts/Navbar";
import Input from "../components/Input";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import GenresFilter from "../components/GenresFilter";
import AddIcon from '@mui/icons-material/Add';
import FilterAndSort from "../components/FilterAndSort";
// This is a dedicated page for shows
const Shows = ()=> {
    return (
        <div>
            <Navbar />
            <h2>Filter & Sort</h2>
            <FilterAndSort />
            <h2>Genres</h2>
            <GenresFilter />
            <h2>Number of Seasons</h2>
            <Input />
            <Input />
            <Button name="Apply Filters" />
            <Button name="Reset" />
            <h1>Browse Tv Shows</h1>

            <FilmCard />
            <p>8.5</p>
            <AddIcon />
            <p>Title</p>
            {/* The film cards obviously will be looped through */}
            {/* We need to add a navigation for next pages, a numbered one */}
        </div>
    )
}
export default Shows;