import React from "react";
import Navbar from "../components/Navbar";
import ProfilePic from "../components/ProfilePic";
import Button from "../components/Button";
import StatBox from "../components/StatBox";
import ComboBox from "../components/ComboBox";
import GenresFilter from "../components/GenresFilter";
// This is a page that shows user details/profile
function Profile() {
    const sorting = ["Date Added","Title (A–Z)","Release Year","Rating","Popularity","Runtime"]
    const genres = ["Action","Adventure","Drama","Comedy","Science Fiction"]
    const currentYear = new Date().getFullYear();
    const earlistYear = 1888;
    return (
        <div>
            <Navbar />
            <ProfilePic />
            <h2>User name</h2>
            <p>Joining month and year</p>
            <Button>Edit Profile</Button>
            <StatBox statName="Movies Watched" statNumber="25" />
            <StatBox statName="Reviews Written" statNumber="10" />
            <StatBox statName="Lists Created" statNumber="5" />
            <Button>Watched</Button>
            <Button>Want to Watch</Button>
            <Button>Reviews</Button>
            <ComboBox label="Sort by" name="sort" options={sorting} />
            <ComboBox label="Genres" name="genre" options={genres} />
            <ComboBox label="Year" name="year" options={genres} />
        </div>
    )
}
export default Profile;