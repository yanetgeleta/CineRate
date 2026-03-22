import React from "react";

const FilmCard = ({ imgClasses, ...props }) => {
  return (
    <div>
      <img className={imgClasses} src={props.src} alt="a film card" />
    </div>
  );
};

export default FilmCard;
