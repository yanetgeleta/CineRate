import React from "react";
import Navbar from "../components/Navbar";
// This is a dedicated page for shows
const Shows = ()=> {
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
        </div>
    )
}
export default Shows;