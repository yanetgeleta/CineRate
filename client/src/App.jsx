import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/moviedetail" element={<MovieDetail/>} />
                    <Route path="/showdetail" element={<ShowDetail/>} />
                    <Route path="/loginsignup" element={<LoginSignUp/>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/otheruser" element={<OtherUser />} />
                    <Route path="/movies" element={<Movies />}/>
                    <Route path="/shows" element={<Shows />} />
                    <Route path="/dashboard" element={<Home/>} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>

    )
}
export default App;