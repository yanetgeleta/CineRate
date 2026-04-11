import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ClipLoader } from "react-spinners";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (userData, token) => {
    //more inforarmation will be collected later on
    localStorage.setItem("token", token);
    setUser(userData);
  };
  // some browsers send get requests before loading leading users being logged out on the first render
  // so changed to post to logout
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[60vh] mt-20">
        <ClipLoader
          loading={loading}
          aria-label="Loading Movies Spinner"
          data-testid="loader"
          className="h-screen mt-20"
          color="white"
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
