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
      <div className="flex flex-col">
        <div className="flex items-center gap-4 border-b border-white/10 px-6 py-4">
          <FilmCard
            imgClasses={
              "h-20 w-14 flex-shrink-0 rounded-md bg-cover bg-center bg-no-repeat"
            }
            src={cardSrc}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold leading-normal">{title}</h1>
            <p className="text-sm font-normal leading-normal text-[#9692c9]">
              Your review for this film
            </p>
          </div>
        </div>
        <div>
          {/* Review section */}
          <label htmlFor="new-review">
            <h3 className="pb-2 text-base font-medium leading-normal">
              Your Review
            </h3>
            <textarea
              className="form-input min-h-36 w-full flex-1 resize-y overflow-hidden rounded-lg border p-4 text-base font-normal leading-normal focus:border-[#2513ec] focus:outline-0 focus:ring-2 focus:ring-[#2513ec]/50 border-[#373267] bg-[#1b1933] text-white placeholder:text-[#9692c9]"
              id="new-review"
              aria-label="film-review"
              onChange={reviewOnChange}
              value={review}
            />
          </label>
          <Rating
            className="cursor-pointer text-amber-400 drop-shadow-md [&_.MuiRating-iconEmpty]:text-amber-400/50! transition-all"
            onChange={(event, newValue) => {
              ratingOnChange(event, newValue);
            }}
            name="film-rating"
            precision={0.5}
            value={rating}
          />
          {/* action buttons */}
          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              className="flex h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold  transition-colors  bg-[#222a3d]/60 hover:bg-[#31394d]"
              onClick={() => {
                setReview("");
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              className="flex h-11 items-center justify-center rounded-lg bg-[#adc6ff] px-6 py-2.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#4d8eff]"
              onClick={() => {
                setReview("");
                onReviewSubmit(review);
                onRatingSubmit(rating);
                onClose();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default ReviewModal;
