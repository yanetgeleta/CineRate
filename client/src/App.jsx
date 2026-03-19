import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignUp from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import OtherUser from "./pages/OtherUser";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import MovieDetail from "./pages/MovieDetail";
import ShowDetail from "./pages/ShowDetail";
import Home from "./pages/home";
import Footer from "./layouts/Footer";
import { AuthProvider } from "./context/AuthContext";
import Genres from "./pages/Genres";
import { LibraryProvider } from "./context/LibraryContex";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/moviedetail/:movieId" element={<MovieDetail />} />
            <Route path="/showdetail/:showId" element={<ShowDetail />} />
            <Route path="/loginsignup" element={<LoginSignUp />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/otheruser/:userId" element={<OtherUser />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <Footer />
        </Router>
      </LibraryProvider>
    </AuthProvider>
  );
}
export default App;
