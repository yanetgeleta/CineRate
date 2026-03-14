import Rating from "@mui/material/Rating";
import React from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";
import { useEffect } from "react";

function EditReviewModal({
  prevRating,
  prevReview,
  isOpen,
  onClose,
  onReviewSubmit,
  onRatingSubmit,
}) {
  const [reviewText, setReviewText] = useState(prevReview.review_text);
  const [rating, setRating] = useState(prevRating);
  useEffect(() => {
    if (isOpen) {
      setReviewText(prevReview.review_text);
    }
  }, [isOpen, prevReview]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1>Edit Your Review</h1>
        <fieldset>
          <legend>YOUR RATING</legend>
          <Rating
            onChange={() => {
              setRating();
            }}
            name="film-rating"
            precision={0.5}
            value={rating}
          />
        </fieldset>
        <fieldset>
          <legend>YOUR REVIEW</legend>
          <div>
            <textarea
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
              value={reviewText}
              aria-label="edit review modal"
            />
          </div>
        </fieldset>
        <Button
          onClick={() => {
            onReviewSubmit(reviewText, prevReview.id);
            onRatingSubmit(rating);
            onClose();
          }}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
}
export default EditReviewModal;
