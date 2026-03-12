import React, { useState } from "react";
import FilmCard from "./FilmCard";
import Rating from "@mui/material/Rating";
import Modal from "./Modal";
import Button from "./Button";

function ReviewModal({
  isOpen,
  onClose,
  title,
  cardSrc,
  onReviewSubmit,
  onRatingSubmit,
  prevRating,
}) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(prevRating || 0);
  const reviewOnChange = (e) => {
    setReview(e.target.value);
  };
  const ratingOnChange = (e, value) => {
    setRating(value);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1>{title}</h1>
        <p>Your review for this film</p>
        <FilmCard src={cardSrc} />
        <h3>Your Review</h3>
        <textarea
          aria-label="film-review"
          onChange={reviewOnChange}
          value={review}
        />
        <Button
          onClick={() => {
            onReviewSubmit(review);
            onRatingSubmit(rating);
            onClose();
          }}
        >
          Submit
        </Button>
        <Rating
          onChange={(event, newValue) => {
            ratingOnChange(event, newValue);
          }}
          name="film-rating"
          precision={0.5}
          value={rating}
        />
      </div>
    </Modal>
  );
}
export default ReviewModal;
