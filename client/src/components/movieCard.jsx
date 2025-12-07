import React from "react";
import Button from "./Button";

const MovieCard = ()=> {
    return (
        <div>
            <img src="https://placehold.co/100x150" alt="mulitple movie cards will be made" />
            <p>Title</p>
            <p>Release year</p>
            <p>Rating</p>
        </div>
    )
}

export const MovieOnDisplay = ()=> {
    return (
        <div>
            <img src="https://placehold.co/100x150" alt="Movie on display" />
            <p>Title</p>
            <p>Description</p>
            <p>Rating</p>
            <Button name="Trailer" />
        </div>
    )
}

export default MovieCard;