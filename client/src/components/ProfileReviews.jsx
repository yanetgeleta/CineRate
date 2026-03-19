import React from "react";
import { Link } from "react-router-dom";

function ProfileReviews({ review, posterBase }) {
  return (
    <div>
      <Link
        to={`/${review.film_type === "movie" ? "moviedetail" : "showdetail"}/${review.tmdb_id}`}
      >
        <img src={`${posterBase}${review.poster_path}`} />
        <h2>{review.title}</h2>
        <p>{review.review_tex}</p>
        <p>Review at {review.created_at}</p>
      </Link>
    </div>
  );
}

export default ProfileReviews;
