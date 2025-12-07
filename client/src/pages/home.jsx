import React from "react";
import Navbar from "../components/Navbar";
import MovieCard, { MovieOnDisplay } from "../components/movieCard";
// This is the home page that users see when they search for site
function Home() {
    return (
        <div>
            <Navbar />
            <MovieOnDisplay />
            <h2>Trending</h2>
            <MovieCard />
            <h2>New Releases</h2>
            <MovieCard />
            <h2>Top Rated</h2>
            <MovieCard />
            {/* we will loop through the value we get from the api */}
        </div>
    )
}

export default Home;