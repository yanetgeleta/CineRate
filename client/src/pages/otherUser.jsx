import React from "react";
import Navbar from "../layouts/Navbar";
import Button from "../components/Button";
import ComboBox from "../components/ComboBox";
import ProfilePic from "../components/ProfilePic";
import StatBox from "../components/StatBox";
import Input from "@mui/material/Input";
import Reviews from "../components/Reviews";
// This is a page that shows other users details/profiles
function OtherUser() {
    const sortingOptions = ["Rating", "Recent", "Oldest"];
    return (
        <div>
            <Navbar />
            <ProfilePic />
            <h2>User name</h2>
            <p>Joining month and year</p>
            <p>bio</p>
            <Button>Follow</Button>
            <StatBox statName="Movies Watched" statNumber="256" />
            <StatBox statName="Reviews Written" statNumber="112" />
            <StatBox statName="Followers" statNumber="1.2k" />
            <StatBox statName="Following" statNumber="450" />
            <Input />
            <ComboBox name="user-rating" label="Sort By" options={sortingOptions} />
            <Button>Activity</Button>
            <Button>Reviews</Button>
            <Button>Ratings</Button>
            <Button>Lists</Button>
            <Reviews title="Movie Title" releaseYear="2021" />
        </div>
    )
};
export default OtherUser;