import React, { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const LibraryContext = createContext(null);

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [userLibrary, setUserLibrary] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setUserLibrary(libraryObj.data);
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
};
