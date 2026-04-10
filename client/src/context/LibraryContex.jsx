import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext(null);

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [userRatings, setUserRatings] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  // next: set ratings, reviews, status separately and then send them to the front end
  //      easier to edit wnen status is updated and comments are written too

  const token = localStorage.getItem("token");

  // This gets all the reviews, ratings, and status updates for a single user from the backend
  useEffect(() => {
    async function fetchUserLibrary() {
      if (!user) {
        setUserRatings({});
        setUserReviews({});
        setUserStatus({});
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/library/all`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const libraryObj = await response.json();

        setUserRatings(libraryObj.ratings);
        setUserReviews(libraryObj.reviews);
        setUserStatus(libraryObj.userStatusLibrary);
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

  // film rating, status values for a single movie for the current user
  // Used in pages where ratings of one movie for user is needed
  const getFilmRating = (filmId) => {
    if (!userRatings) {
      return {
        film_type: null,
        rating: null,
        tmdb_id: filmId,
      };
    }
    return (
      userRatings[filmId] || {
        film_type: null,
        rating: null,
        tmdb_id: filmId,
      }
    );
  };
  const getFilmStatus = (filmId) => {
    if (!userStatus) {
      return {
        status: null,
        is_favorited: false,
        tmdb_id: filmId,
      };
    }
    return (
      userStatus[filmId] || {
        status: null,
        is_favorited: false,
        tmdb_id: filmId,
      }
    );
  };
  // updates the local variables first and then sends to the backend
  const statusUpdateCall = async (
    filmId,
    mediaType,
    updatedStatus,
    posterPath,
    title,
  ) => {
    //  No need for local fall backs, the response will come back in time (trust)
    const body = {
      filmId: filmId,
      mediaType: mediaType,
      filmStatus: updatedStatus,
      posterPath: posterPath,
      title: title,
    };
    try {
      // the response is unneccessarily long, with user id and stuff
      const response = await fetch(
        `${API_BASE_URL}/api/library/update/film/status`,
        {
          method: "POST",
          body: JSON.stringify(body),
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) throw new Error("Failed to update the status database");
      const responseObj = await response.json();
      setUserStatus((prev) => {
        return { ...prev, [filmId]: responseObj };
      });
    } catch (err) {
      console.error("Library context error trying to update status table");
      // setUserStatus(prevUserStatus);
    }
  };
  const ratingUpdateCall = async (
    newRating,
    filmType,
    filmId,
    posterPath,
    title,
  ) => {
    try {
      const body = {
        filmId: filmId,
        filmType: filmType,
        rating: newRating,
        posterPath: posterPath,
        title: title,
      };
      const updateRatingRes = await fetch(
        `${API_BASE_URL}/api/reviews/update/rating`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      if (!updateRatingRes.ok) {
        throw new Error("Couldn't update rating for a film at library context");
      }
      const updatedRatingObj = await updateRatingRes.json();
      const newRatingObj = { [updatedRatingObj.tmdb_id]: updatedRatingObj };
      setUserRatings((prev) => {
        return { ...prev, ...newRatingObj };
      });
      // setRating(updatedRatingObj.rating);
      // setRefreshTrigger((prev) => !prev);
    } catch (err) {
      throw new Error("Error updating user rating");
    }
  };
  return (
    <LibraryContext.Provider
      value={{
        getFilmRating,
        getFilmStatus,
        statusUpdateCall,
        ratingUpdateCall,
        userRatings,
        userReviews,
        userStatus,
        loading,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
export const useLibrary = () => useContext(LibraryContext);
