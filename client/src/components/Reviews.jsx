import React from "react";
import FilmCard from "./FilmCard";

const Reviews = (props)=> {
    return (
        <div>
            <FilmCard />
            <h2>{props.title}</h2>
            <p>{props.releaseYear}</p>
            <p>rating along with stars</p>
            <p>
                A review from the other user
            </p>
        </div>
    )
}
export default Reviews;