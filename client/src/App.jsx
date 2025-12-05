import React from "react";
import Home from "./pages/home";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/movieDetail";
import Show from "./pages/showDetail";
import LoginSignUp from "./pages/loginSignup";
import Profile from "./pages/profilePage";
import OtherUser from "./pages/otherUser";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movieDetail" element={<Movie/>} />
                <Route path="/showDetail" element={<Show/>} />
                <Route path="/loginSingup" element={<LoginSignUp/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/otherUser" element={<OtherUser />} />
            </Routes>
        </Router>
    )
}
export default App;