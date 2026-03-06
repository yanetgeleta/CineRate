import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext(null);
const [reviewsObj, setReviewsObj] = useState(null);

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [userLibrary, setUserLibrary] = useState(null);
  const [userRatings, setUserRatings] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  // next: set ratings, reviews, status separately and then send them to the front end
  //      easier to edit wnen status is updated and comments are written too

  useEffect(() => {
    async function fetchUserLibrary() {
      if (!user) {
        setUserLibrary(null);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/library/all", {
          credentials: "include",
        });
        const libraryObj = await response.json();
        setUserLibrary(libraryObj);
      } catch (err) {
        throw new Error({
          message: "Error fetching user library at Library context!",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchUserLibrary();
  }, [user]);
  // We want the status update to be here so we can update the local and database at the same time while also having hte changes at reload and user changes
  // Instead of one interation, get one for status update, one for rating, and another for reviews
  // We also have a revies getter route at reviewRating route if need be

  // film rating, status values for a single movie for the current user
  // Used in pages where ratings of one movie for user is needed
  const getFilmRating = () => {
    return (
      userLibrary.ratings.filmId || {
        film_type: null,
        rating: null,
      }
    );
  };
  const getFilmStatus = (filmId) => {
    return (
      userLibrary.userLibrary.filmId || {
        status: null,
        is_favorited: false,
      }
    );
  };
  // Gets all the comments for the single movie/tv
  const getFilmReviews = async (filmId) => {
    try {
      const response = await fetch(
        `/api/reviews/film/reviews?filmId=${filmId}`,
      );

      const resultData = await response.json();
      setReviewsObj(resultData);
    } catch (err) {
      throw new Error("Error trying to get film reviews from Library context");
    }
  };
  const statusUpdateCall = async (filmId) => {
    const body = {
      filmId: filmId,
      mediaType: mediaType,
      filmStatus: updatedStatus,
    };
    const response = await fetch("/api/library/update/film/status", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  };
};
