import React from "react";
import { useAuth } from "../context/AuthContext";

function FilmReviewComp({ myReviews, otherReviews, reviews }) {
  const { user } = useAuth();
  return (
    <div>
      {user && myReviews && (
        <>
          <h3>My Reviews</h3>
          {myReviews.map((review) => {
            return <p>{review.review_text}</p>;
          })}
        </>
      )}
      {user && myReviews && otherReviews && (
        <>
          <h3>Other Reviews</h3>
          {otherReviews.map((review) => {
            return <p>{review.review_text}</p>;
          })}
        </>
      )}
      {!myReviews && (
        <>
          <h3>Reviews</h3>
          {reviews.map((review) => {
            return <p>{review.review_text}</p>;
          })}
        </>
      )}
    </div>
  );
}

export default FilmReviewComp;
