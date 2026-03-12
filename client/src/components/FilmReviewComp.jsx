import React from "react";
import { useAuth } from "../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

function FilmReviewComp({ myReviews, otherReviews, reviews }) {
  const { user } = useAuth();
  if (!myReviews) {
    return (
      <div>
        <h3>Reviews</h3>
        {reviews.map((review) => {
          return (
            <div>
              <img /> <h3>FName LName</h3>
              <p>2 days ago</p>
              <p>{review.review_text}</p>
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <IconButton>
                <CommentIcon />
              </IconButton>
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
        <div>
          <h3>My Reviews</h3>
          {myReviews.map((review) => {
            return (
              <div
                style={{
                  border: "1px solid",
                  width: "25vw",
                  marginBottom: "2em",
                }}
                key={review.id}
              >
                <img /> <h3>{user.display_name}</h3> <sub>YOU</sub>{" "}
                <IconButton>
                  <EditIcon />
                </IconButton>
                <p>{review.created_at}</p>
                <p>{review.review_text}</p>
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
      )}
      {user && myReviews && otherReviews && (
        // I will have to get each of the informations here for the people that commented on a movie or tv show (film)
        // Users can like, comment and reply to other users
        <div>
          <h3>Other Reviews</h3>
          {otherReviews.map((review) => {
            return (
              <div>
                <img /> <h3>FName LName</h3>
                <p>2 days ago</p>
                <p>{review.review_text}</p>
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilmReviewComp;
