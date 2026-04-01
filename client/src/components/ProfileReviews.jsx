import React from "react";
import { Link } from "react-router-dom";

function ProfileReviews({ review, posterBase }) {
  return (
    <Link
      className="flex flex-col sm:flex-row gap-4 pb-6 bg-[#171f33] m-2 pl-4 pt-4 pr-4 rounded-lg"
      to={`/${review.film_type === "movie" ? "moviedetail" : "showdetail"}/${review.tmdb_id}`}
    >
      <img
        className="w-full sm:w-30 aspect-2/3 rounded-md object-cover"
        src={`${posterBase}${review.poster_path}`}
      />
      <div>
        <h2 className="text-lg font-bold">{review.title}</h2>
        <p className="text-sm text-slate-50 leading-relaxed">
          {review.review_text}
        </p>
        {/* new Date(date).toLocaleDateString() */}
        <p className="text-xs text-slate-400">
          Review at {new Date(review.created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default ProfileReviews;
