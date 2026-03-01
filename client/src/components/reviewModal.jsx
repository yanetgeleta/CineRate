import React, { useState } from "react";
import FilmCard from "./FilmCard";
import Rating from "@mui/material/Rating";
import Modal from "./Modal";
import Button from "./Button";

function ReviewModal({ isOpen, onClose, title, cardSrc }) {
  const [review, setReview] = useState(null);
  const reviewOnChange = (e) => {
    setReview(e.target.value);
  };
  const onSubmit = () => {};
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1>{title}</h1>
        <p>Your review for this film</p>
        <FilmCard src={cardSrc} />
        <h3>Your Review</h3>
        <textarea aria-label="film-review" onChange={reviewOnChange}>
          {review}
        </textarea>
        <Button onClick={onSubmit}>Submit</Button>
        <Rating name="film-rating" precision={0.5} />
      </div>
    </Modal>
  );
}
export default ReviewModal;
