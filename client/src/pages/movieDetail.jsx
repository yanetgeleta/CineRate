import React from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import StarIcon from '@mui/icons-material/Star';
import CreateIcon from '@mui/icons-material/Create';
// This is the page that shows details of a specific movie when clicked on
function MovieDetail() {
    return (
        <div>
            <Navbar />
            <FilmCard /> {/* the big background */}
            <FilmCard /> {/* the smaller card */}
            <h2>Title</h2>
            <p>Rating</p>
            <p>Release/on air date</p>

            <Button>Action</Button> {/* loops the genre for the movie */}

            <Button><BookmarkAddIcon/> Add To Watchlist</Button>
            <Button><StarIcon/> Rate</Button>
            <Button><CreateIcon/> Write a Review</Button>  

            <Button>Details</Button>
            <Button>Cast & Crew</Button>
            <Button>Reviews</Button>
            {/* Each button will render its respective information */}
        </div>
    )
};
export default MovieDetail;