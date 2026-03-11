import React from "react";
import { useAuth } from "../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

function FilmReviewComp({ myReviews, otherReviews, reviews }) {
  const { user } = useAuth();
  return (
    <div>
      {user && myReviews && (
        // These are all my informations so easy to get them
        // I can comment on my review, I can like it, I can reply to other people that replied
        <div>
          <h3>My Reviews</h3>
          {myReviews.map((review) => {
            return (
              <div>
                <img /> <h3>FName LName</h3> <sub>YOU</sub>{" "}
                <IconButton>
                  <EditIcon />
                </IconButton>
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
      {!myReviews && (
        <div>
          <h3>Reviews</h3>
          {reviews.map((review) => {
            return <p>{review.review_text}</p>;
          })}
        </div>
      )}
    </div>
  );
}

export default FilmReviewComp;
