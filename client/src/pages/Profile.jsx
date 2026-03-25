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
import { ClipLoader } from "react-spinners";
import ProfileReviews from "../components/ProfileReviews";
// This is a page that shows user details/profile
function Profile() {
  //   const sorting = [
  //     { name: "Choose a sorting method", hidden: true },
  //     { name: "Date Added", hidden: false },
  //     { name: "Title (A–Z)", hidden: false },
  //     { name: "Release Year", hidden: false },
  //     { name: "Rating", hidden: false },
  //     { name: "Popularity", hidden: false },
  //     { name: "Runtime", hidden: false },
  //   ];
  //   const genres = [
  //     { name: "Select genres", hidden: true },
  //     { name: "Action", hidden: false },
  //     { name: "Adventure", hidden: false },
  //     { name: "Drama", hidden: false },
  //     { name: "Comedy", hidden: false },
  //     { name: "Science Fiction", hidden: false },
  //   ];
  const currentYear = new Date().getFullYear();
  const earlistYear = 1888;

  const { user, login, logout } = useAuth();
  const { userRatings, userReviews, userStatus, loading } = useLibrary();
  if (loading) {
    return <ClipLoader loading={loading} />;
  }
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
  const reviewPosterWidth = "w154";
  const smallBannerWidth = "w300";

  const [listOnDisplay, setListOnDisplay] = useState(watchlistArr);
  const [reviewsOn, setReviewsOn] = useState(false);

  const filmsWatched = watchedArr.length;
  const filmsToWatch = watchlistArr.length;
  const reviewsWritten = userReviews.length;
  const filmsRated = ratingsArr.length;

  return (
    <div>
      {/* <Navbar /> */}
      <ProfilePic />

      {loading ? (
        <ClipLoader loading={loading} />
      ) : (
        <div>
          <h2>{user.display_name}</h2>
          <p>{user.created_at}</p>
          {/* Edit profile will be a version two functionality */}
          {/* <Button>Edit Profile</Button> */}
          {/* pull out the watched, reviews lines from the database for the user */}
          <StatBox statName="Films Watched" statNumber={filmsWatched} />
          <StatBox statName="Films To Watch" statNumber={filmsToWatch} />
          <StatBox statName="Films Rated" statNumber={filmsRated} />
          <StatBox statName="Reviews Written" statNumber={reviewsWritten} />
          {/* <StatBox statName="Lists Created" statNumber="5" /> */}

          <Button
            onClick={() => {
              setReviewsOn(false);
              setListOnDisplay(watchlistArr);
            }}
          >
            Want to Watch
          </Button>
          <Button
            onClick={() => {
              setReviewsOn(false);
              setListOnDisplay(watchedArr);
            }}
          >
            Watched
          </Button>
          <Button
            onClick={() => {
              setReviewsOn(false);
              setListOnDisplay(favoritesArr);
            }}
          >
            Favorites
          </Button>
          <Button
            onClick={() => {
              setReviewsOn(true);
            }}
          >
            Reviews
          </Button>
          {/* Sort and filter methods will a next version features */}
          {/* <ComboBox label="Sort by" name="sort" options={sorting} />
      <ComboBox label="Genre" name="genre" options={genres} /> */}
          {/* {userStatusArr.map(())} */}
          {reviewsOn ? (
            userReviews.map((review, index) => {
              return (
                <ProfileReviews
                  posterBase={`${basePosterPath}${reviewPosterWidth}`}
                  review={review}
                  key={review.tmdb_id}
                />
              );
            })
          ) : (
            <ProfileFilms
              list={listOnDisplay}
              posterBase={`${basePosterPath}${smallBannerWidth}`}
            />
          )}
        </div>
      )}
    </div>
  );
}
export default Profile;
