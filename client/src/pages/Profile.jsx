import React from "react";
import Navbar from "../layouts/Navbar";
import ProfilePic from "../components/ProfilePic";
import Button from "../components/Button";
import StatBox from "../components/StatBox";
import ComboBox from "../components/ComboBox";
import YearList from "../components/YearList";
import FilmCard from "../components/FilmCard";
import { useAuth } from "../context/AuthContext";
import FilterAndSort from "../components/FilterAndSort";
import { useLibrary } from "../context/LibraryContex";
import ProfileFilms from "../components/ProfileFilms";
// This is a page that shows user details/profile
function Profile() {
  const sorting = [
    { name: "Choose a sorting method", hidden: true },
    { name: "Date Added", hidden: false },
    { name: "Title (A–Z)", hidden: false },
    { name: "Release Year", hidden: false },
    { name: "Rating", hidden: false },
    { name: "Popularity", hidden: false },
    { name: "Runtime", hidden: false },
  ];
  const genres = [
    { name: "Select genres", hidden: true },
    { name: "Action", hidden: false },
    { name: "Adventure", hidden: false },
    { name: "Drama", hidden: false },
    { name: "Comedy", hidden: false },
    { name: "Science Fiction", hidden: false },
  ];
  const currentYear = new Date().getFullYear();
  const earlistYear = 1888;

  const { user, login, logout } = useAuth();
  const { userRatings, userReviews, userStatus } = useLibrary();

  const userStatusArr = Object.values(userStatus);
  const watchedArr = userStatusArr.filter((film) => film.status === "watched");
  const watchlistArr = userStatusArr.filter(
    (film) => film.status === "watchlist",
  );
  const favoriteArr = userStatusArr.filter(
    (film) => film.is_favorited === true,
  );

  return (
    <div>
      <Navbar />
      <ProfilePic />
      <h2>{user.display_name}</h2>
      <p>{user.created_at}</p>
      <Button>Edit Profile</Button>
      {/* pull out the watched, reviews lines from the database for the user */}
      <StatBox statName="Films Watched" statNumber="25" />
      <StatBox statName="Reviews Written" statNumber="10" />
      {/* <StatBox statName="Lists Created" statNumber="5" /> */}
      <Button>Watched</Button>
      <Button>Want to Watch</Button>
      <Button>Favorites</Button>
      <Button>Reviews</Button>
      <ComboBox label="Sort by" name="sort" options={sorting} />
      <ComboBox label="Genre" name="genre" options={genres} />
      {/* {userStatusArr.map(())} */}
      <ProfileFilms />
    </div>
  );
}
export default Profile;
