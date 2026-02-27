import React from "react";
import FilmCard from "./FilmCard";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "./Modal";

function ReviewModal({ isOpen, onClose, ...otherProps }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <FilmCard src={otherProps.cardSrc} />
        <h1>{otherProps.title}</h1>
        <p>Your review for this film</p>
        <h3>Your Review</h3>
        <textarea aria-label="film-review" />
        <Rating name="film-rating" precision={0.5} />
      </div>
    </Modal>
  );
}
export default ReviewModal;
