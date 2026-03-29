import React from "react";
import { useAuth } from "../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";

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
  if (!myReviews) {
    // When I haven't made a comment, or there is no user
    return (
      <div>
        <h3>Reviews</h3>
        {reviews.map((review) => {
          return (
            <div>
              <img src={review.profile_pic_url} />{" "}
              <h3>{review.display_name}</h3>
              <p>{review.created_at}</p>
              <p>{review.review_text}</p>
              {/* <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <IconButton>
                <CommentIcon />
              </IconButton> */}
              {/* Second version features */}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {user && myReviews && (
        // These are all my informations so easy to get them
        // I can comment on my review, I can like it, I can reply to other people that replied
        // My review
        <div>
          {myReviews.map((review) => {
            return (
              <div
                className="bg-[#171f33] rounded-3xl p-8 relative overflow-hidden group my-2"
                key={review.id}
              >
                <div className="absolute top-0 right-0 p-6 flex gap-2">
                  <p>{new Date(review.created_at).toLocaleDateString()}</p>
                  <p className="">YOUR REVIEW</p>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-black/20">
                    <img
                      alt="My profile Picture"
                      src={review.profile_pic_url}
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
                    <p className="text-[#c2c6d6] leading-relaxed mb-6 w-[70%]">
                      {review.review_text}
                    </p>
                    <div className="flex items-center gap-4">
                      <IconButton
                        onClick={() => {
                          editHandler(review);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          onDelete(review.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {user && myReviews && otherReviews && (
        // I will have to get each of the informations here for the people that commented on a movie or tv show (film)
        // Users can like, comment and reply to other users
        <div>
          <h3>Community Reviews</h3>
          {otherReviews.map((review) => {
            return (
              <div>
                <img src={review.profile_pic_url} />{" "}
                <h3>{review.display_name}</h3>
                <p>{review.created_at}</p>
                <p>{review.review_text}</p>
                {/* <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <IconButton>
                  <CommentIcon />
                </IconButton> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilmReviewComp;
