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
import { useState } from "react";
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
  const ratingsArr = Object.values(userRatings);
  const watchedArr = userStatusArr.filter((film) => film.status === "watched");
  const watchlistArr = userStatusArr.filter(
    (film) => film.status === "watchlist",
  );
  const favoritesArr = userStatusArr.filter(
    (film) => film.is_favorited === true,
  );

  const basePosterPath = "https://image.tmdb.org/t/p/";
  const smallBannerWidth = "w300";

  const [listOnDisplay, setListOnDisplay] = useState(watchlistArr);

  const filmsWatched = watchedArr.length;
  const filmsToWatch = watchlistArr.length;
  const reviewsWritten = userReviews.length;
  const filmsRated = ratingsArr.length;

  return (
    <div>
      <Navbar />
      <ProfilePic />
      <h2>{user.display_name}</h2>
      <p>{user.created_at}</p>
      <Button>Edit Profile</Button>
      {/* pull out the watched, reviews lines from the database for the user */}
      <StatBox statName="Films Watched" statNumber={filmsWatched} />
      <StatBox statName="Films To Watch" statNumber={filmsToWatch} />
      <StatBox statName="Films Rated" statNumber={filmsRated} />
      <StatBox statName="Reviews Written" statNumber={reviewsWritten} />
      {/* <StatBox statName="Lists Created" statNumber="5" /> */}

      <Button
        onClick={() => {
          setListOnDisplay(watchlistArr);
        }}
      >
        Want to Watch
      </Button>
      <Button
        onClick={() => {
          setListOnDisplay(watchedArr);
        }}
      >
        Watched
      </Button>
      <Button
        onClick={() => {
          setListOnDisplay(favoritesArr);
        }}
      >
        Favorites
      </Button>
      <Button
        onClick={() => {
          setListOnDisplay(userReviews);
        }}
      >
        Reviews
      </Button>
      {/* Sort and filter methods will a next version features */}
      {/* <ComboBox label="Sort by" name="sort" options={sorting} />
      <ComboBox label="Genre" name="genre" options={genres} /> */}
      {/* {userStatusArr.map(())} */}
      <ProfileFilms
        list={listOnDisplay}
        posterBase={`${basePosterPath}${smallBannerWidth}`}
      />
    </div>
  );
}
export default Profile;
