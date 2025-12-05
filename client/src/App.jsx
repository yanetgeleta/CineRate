import React from "react";
import Home from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Movie from "./pages/MovieDetail";
import Show from "./pages/ShowDetail";
import LoginSignUp from "./pages/LoginSignup";
import Profile from "./pages/ProfilePage";
import OtherUser from "./pages/OtherUser";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movieDetail" element={<Movie/>} />
                <Route path="/showDetail" element={<Show/>} />
                <Route path="/loginSignup" element={<LoginSignUp/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/otherUser" element={<OtherUser />} />
                <Route path="/movies" element={<Movies />}/>
                <Route path="/shows" element={<Shows />} />
            </Routes>
            <Footer />
        </Router>
    )
}
export default App;