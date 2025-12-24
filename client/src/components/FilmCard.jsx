import React from "react";

const FilmCard = (props)=> {
    return (
        <div>
            <img src={props.src} alt="a film card" />
        </div>
    )
}

export default FilmCard;