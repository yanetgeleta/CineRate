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
        <h1 className="text-2xl font-bold text-slate-100 px-8 py-6 border-b border-[#2513ec]/10 flex items-center">
          Edit Your Review
        </h1>

        <div className="space-y-2">
          <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            YOUR REVIEW
          </h1>
          <textarea
            placeholder="Share your thoughts on the film..."
            className="w-full min-h-40 p-4 rounded-lg bg-slate-800 border border-[#2513ec]/10 focus:border-[#2513ec] focus:ring-2 focus:ring-[#2513ec]/20 transition-all  text-slate-100 placeholder:text-slate-400 whitespace-pre-wrap"
            onChange={(e) => {
              setReviewText(e.target.value);
            }}
            value={reviewText}
            aria-label="edit review modal"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            YOUR RATING
          </h1>
          <Rating
            className="cursor-pointer text-amber-400 drop-shadow-md [&_.MuiRating-iconEmpty]:text-amber-400/50! transition-all"
            onChange={() => {
              setRating();
            }}
            name="film-rating"
            precision={0.5}
            value={rating}
          />
        </div>
        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="flex h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold  transition-colors  bg-[#222a3d]/60 hover:bg-[#31394d]"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="flex h-11 items-center justify-center rounded-lg bg-[#adc6ff] px-6 py-2.5 text-base font-semibold shadow-sm transition-colors hover:bg-[#4d8eff] text-[#002e6a]"
            onClick={() => {
              onReviewSubmit(reviewText, prevReview.id);
              onRatingSubmit(rating);
              onClose();
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default EditReviewModal;
