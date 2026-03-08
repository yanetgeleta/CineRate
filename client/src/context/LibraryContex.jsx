import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext(null);

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [reviewsObj, setReviewsObj] = useState(null);
  const [userReviewsObj, setUserReviewsObj] = useState(null);
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
        setUserRatings({});
        setUserReviews({});
        setUserStatus({});
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("/api/library/all", {
          credentials: "include",
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
  // We want the status update to be here so we can update the local and database at the same time while also having hte changes at reload and user changes
  // Instead of one interation, get one for status update, one for rating, and another for reviews
  // We also have a revies getter route at reviewRating route if need be

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
  // Gets all the comments for the single movie/tv
  const getFilmReviews = async (filmId) => {
    try {
      const response = await fetch(
        `/api/reviews/film/reviews?filmId=${filmId}`,
      );

      const resultData = await response.json();
      setReviewsObj(resultData);
      return resultData;
    } catch (err) {
      throw new Error("Error trying to get film reviews from Library context");
    }
  };
  const statusUpdateCall = async (filmId, mediaType, updatedStatus) => {
    const updates =
      typeof updatedStatus === "boolean"
        ? { is_favorited: updatedStatus }
        : { status: updatedStatus };
    const prevUserStatus = { userStatus };
    setUserStatus({
      ...userStatus,
      [filmId]: { ...userStatus.filmId, ...updates },
    });
    const body = {
      filmId: filmId,
      mediaType: mediaType,
      filmStatus: updatedStatus,
    };
    try {
      // the response is unneccessarily long, with user id and stuff
      const response = await fetch("/api/library/update/film/status", {
        method: "POST",
        body: JSON.stringify(body),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update the status database");
    } catch (err) {
      console.error("Library context error trying to update status table");
      setUserLibrary(prevUserStatus);
    }
  };
  return (
    <LibraryContext.Provider
      value={{
        getFilmRating,
        getFilmReviews,
        getFilmStatus,
        statusUpdateCall,
        loading,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
export const useLibrary = () => useContext(LibraryContext);
