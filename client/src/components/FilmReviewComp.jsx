import React from "react";
import { useAuth } from "../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

function FilmReviewComp({
  myReviews,
  otherReviews,
  reviews,
  openEditReview,
  handleReview,
  onDelete,
  rating,
}) {
  const { user } = useAuth();
  const editHandler = (review) => {
    openEditReview(review);
  };
  const avatar = createAvatar(pixelArt, {
    seed: "John Doe",
  });

  const profilePlaceholder = avatar.toDataUri();
  if (reviews.length <= 0) {
    return (
      <p className="my-8 text-md italic tracking-tight">
        No reviews yet. Be the first to review!
      </p>
    );
  }
  if (myReviews.length <= 0) {
    // When I haven't made a comment, or there is no user
    return (
      <div className="my-8">
        <div className="border-b border-[#424754]/10 pb-4">
          <h3 className="text-2xl font-bold tracking-tight">
            Community Reviews
          </h3>
        </div>

        {reviews.map((review) => {
          return (
            <div className="space-y-4 w-full md:w-[70vw] my-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full bg-[#222a3d] border border-outline-variant/20 overflow-hidden"
                  src={review.profile_pic_url || profilePlaceholder}
                />{" "}
                <h3 className="font-bold text-slate-100">
                  {review.display_name}
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {new Date(review.created_at).toLocaleDateString()}
                  {/* new Date(var).toLocaleDateString() */}
                </p>
              </div>
              <p className="text-[#c2c6d6] leading-relaxed">
                {review.review_text}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {user && myReviews.length > 0 && (
        // These are all my informations, so easy to get them
        // I can comment on my review, I can like it, I can reply to other people that replied
        // My review
        <div className="my-8">
          {myReviews.map((review) => {
            return (
              <div
                className="bg-[#171f33] rounded-3xl p-8 relative overflow-hidden my-4 w-full md:w-[70vw]"
                key={review.id}
              >
                <div className="absolute top-0 right-0 p-6 flex gap-2">
                  <p className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">
                    YOUR REVIEW
                  </p>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-black/20">
                    <img
                      alt="My profile Picture"
                      src={review.profile_pic_url || profilePlaceholder}
                    />
                  </div>
                  <div className="grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-xl font-bold text-slate-100">
                        {user.display_name}
                      </h1>
                      <Rating
                        className="cursor-pointer text-amber-400 drop-shadow-md &_.MuiRating-iconEmpty]:text-amber-400/50!"
                        name="film-rating"
                        precision={0.5}
                        value={rating}
                        disabled
                      />
                    </div>
                    <p className="text-[#c2c6d6] leading-relaxed mb-6 w-[70%] whitespace-pre-wrap">
                      {review.review_text}
                    </p>
                    <div className="flex items-center gap-4">
                      <IconButton
                        className="group transition-colors"
                        onClick={() => editHandler(review)}
                      >
                        <EditIcon className="text-slate-500 group-hover:text-slate-200 text-base! transition-colors" />
                      </IconButton>
                      <IconButton
                        className="group transition-colors"
                        onClick={() => onDelete(review.id)}
                      >
                        <DeleteIcon className="text-slate-500 group-hover:text-red-400 text-base! transition-colors" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {user && myReviews && otherReviews.length > 0 && (
        // I will have to get each of the informations here for the people that commented on a movie or tv show (film)
        // Users can like, comment and reply to other users
        <div className="my-8">
          <div className="border-b border-[#424754]/10 pb-4">
            <h3 className="text-2xl font-bold tracking-tight">
              Community Reviews
            </h3>
          </div>

          {otherReviews.map((review) => {
            return (
              <div className="space-y-4 w-full md:w-[70vw] my-4">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full bg-[#222a3d] border border-outline-variant/20 overflow-hidden"
                    src={review.profile_pic_url || profilePlaceholder}
                  />{" "}
                  <h3 className="font-bold text-slate-100">
                    {review.display_name}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-[#c2c6d6] leading-relaxed">
                  {review.review_text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilmReviewComp;
