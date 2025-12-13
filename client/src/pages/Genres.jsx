import React from "react";
import Navbar from "../layouts/Navbar";
import GenreCard from "../components/GenreCard";
// This is a page where users will explore genres both for shows and movies
const Genres = ()=> {
 return (
    <div>
        <Navbar />
        <h2>Explore Genres</h2>
        <p>Browse our collection of movies and TV shows by genre.</p>
        <h2>Popular Genres</h2>
        <GenreCard />
        <p>Action</p>
        {/* We will looop through them ofcourse, I want the genres to be on the picuture and the background picutre blurred */}
        <h2>All Genres</h2>
        <GenreCard />
        {/* we will loop through them ofcourse */}
    </div>
 )   
}
export default Genres;