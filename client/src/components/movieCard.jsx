import React from "react";
import Button from "./Button";

function Movie() {
    return (
        <>
            <img src="" alt="mulitple movie cards will be made" />
            <p>Title</p>
            <p>Release year</p>
            <p>Rating</p>
        </>
        
    )
}

export const MovieOnDisplay = ()=> {
    return (
        <>
            <img src="" alt="Movie on display" />
            <p>Title</p>
            <p>Description</p>
            <p>Rating</p>
            <Button name="Trailer" />
        </>
    )
}

export default Movie;