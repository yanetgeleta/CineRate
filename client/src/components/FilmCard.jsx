import React from "react";

const FilmCard = ({ imgClasses, ...props }) => {
  return (
    <div>
      <img className={imgClasses} src={props.src} alt={props.alt} />
    </div>
  );
};

export default FilmCard;
