import React from "react";
import Navbar from "../layouts/Navbar";
import ProfilePic from "../components/ProfilePic";
import Button from "../components/Button";
import StatBox from "../components/StatBox";
import ComboBox from "../components/ComboBox";
import YearList from "../components/YearList";
import FilmCard from "../components/FilmCard";
import { useAuth } from "../context/AuthContext";
// This is a page that shows user details/profile
function Profile() {
  const sorting = [
    "Date Added",
    "Title (A–Z)",
    "Release Year",
    "Rating",
    "Popularity",
    "Runtime",
  ];
  const genres = ["Action", "Adventure", "Drama", "Comedy", "Science Fiction"];
  const currentYear = new Date().getFullYear();
  const earlistYear = 1888;

  const { user, login, logout } = useAuth();
  return (
    <div>
      <Navbar />
      {/* <ProfilePic /> */}
      <h2>{user.display_name}</h2>
      <p></p>
      <Button>Edit Profile</Button>
      <StatBox statName="Movies Watched" statNumber="25" />
      <StatBox statName="Reviews Written" statNumber="10" />
      <StatBox statName="Lists Created" statNumber="5" />
      <Button>Watched</Button>
      <Button>Want to Watch</Button>
      <Button>Reviews</Button>
      <ComboBox label="Sort by" name="sort" options={sorting} />
      <ComboBox label="Genre" name="genre" options={genres} />
      <YearList
        currentYear={currentYear}
        earliestYear={earlistYear}
        label="Year"
      />
      <FilmCard />
      {/* Will be looped through based on the list selection */}
    </div>
  );
}
export default Profile;
