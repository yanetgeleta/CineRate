import React from "react";
import Navbar from "../components/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
// This is the home page that users see when they search for site
function Home() {
    return (
        <div>
            <Navbar />
            <FilmCard />
            <h2>Title</h2>
            <p>Description</p>
            <Button name="WatchTrailer" />

            <h2>Trending</h2>
            <FilmCard/>
            <h2>New Releases</h2>
            <FilmCard />
            <h2>Top Rated</h2>
            <FilmCard />
            {/* we will loop through the value we get from the api */}
        </div>
    )
}

export default Home;