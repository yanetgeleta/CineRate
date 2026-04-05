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
import { redirect } from "react-router-dom";
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
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
        <ClipLoader
          loading={loading}
          aria-label="Loading Movies Spinner"
          data-testid="loader"
          className="h-screen mt-20"
          color="white"
        />
      </div>
    );
  }

  const userStatusArr = userStatus ? Object.values(userStatus) : [];
  const ratingsArr = userRatings ? Object.values(userRatings) : [];

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

  const [activeTab, setActiveTab] = useState("Want to Watch");

  const filmsWatched = watchedArr.length;
  const filmsToWatch = watchlistArr.length;
  const reviewsWritten = userReviews.length;
  const filmsRated = ratingsArr.length;

  const buttonsData = [
    { text: "Want to Watch", reviewOn: false, listOnDisplay: watchlistArr },
    { text: "Watched", reviewOn: false, listOnDisplay: watchedArr },
    { text: "Favorites", reviewOn: false, listOnDisplay: favoritesArr },
    { text: "Reviews", reviewOn: true, listOnDisplay: null },
  ];
  // StatBox statName="Films To Watch" statNumber={filmsToWatch} />
  //             <StatBox statName="Films Rated" statNumber={filmsRated} />
  //             <StatBox statName="Reviews Written" statNumber={reviewsWritten} />
  const statBoxData = [
    { text: "Films Watched", statNo: filmsWatched },
    { text: "Films To Watch", statNo: filmsToWatch },
    { text: "Films Rated", statNo: filmsRated },
    { text: "Reviews Written", statNo: reviewsWritten },
  ];
  const currentTabData = buttonsData.find((b) => b.text === activeTab);
  const listOnDisplay = currentTabData?.listOnDisplay || [];
  const reviewsOn = currentTabData?.reviewOn || false;

  return (
    <div className="mt-20 md:mx-10">
      {/* <Navbar /> */}

      {loading ? (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
          <ClipLoader
            loading={loading}
            aria-label="Loading Movies Spinner"
            data-testid="loader"
            className="h-screen mt-20"
            color="white"
          />
        </div>
      ) : (
        <div className="px-8">
          <section className="relative h-80 w-full overflow-hidden">
            <div class="absolute inset-0 bg-linear-to-t from-[#0b1326] to-transparent z-10"></div>
            <img
              class="w-full h-full object-cover opacity-30"
              data-alt="Cinematic movie theatre abstract background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEKfh0XQiOIDhqtFYvhzKq8n0SB_uywSVWJJwpCi7rpto8TcfM6-Eav488ordmeyqbBgMnsGODinCARj9o5LsA7rGmXguOeyeK5uA7cF735y6L-AvtQUamH0sd244oGzetL8QaadSpvZqmFXsQyXI4NL8tK1lfO6oMcp4LSG3REuUrhouZb_7S35t2LkXEP5W-okz_2BzHwIjZlAoIt4pImep1nINDVjxegkOXT3PL0vNfD3sRvzyujIGU3X-qesjolla-1tuxLEKw"
            />
            <div className="absolute bottom-0 left-0 p-12 z-20 flex items-end gap-8 w-full max-w-7xl mx-auto">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#222a3d] shadow-2xl">
                <ProfilePic imgClass="w-full h-full object-cover" />
              </div>
              <div className="grow pb-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#dae2fd] mb-1">
                  {user.display_name}
                </h2>
                {/*  */}
                <p className="text-[#c2c6d6] font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="pb-4 hidden md:flex gap-3">
                <button
                  className="px-6 py-2.5 bg-[#4d8eff] text-[#00285d] text-xl rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2"
                  onClick={async () => {
                    await logout();
                    location.assign("/");
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          </section>
          <section>
            {/* Edit profile will be a version two functionality */}
            {/* <Button>Edit Profile</Button> */}
            {/* pull out the watched, reviews lines from the database for the user */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {statBoxData.map((s) => {
                return <StatBox statName={s.text} statNumber={s.statNo} />;
              })}
            </div>

            {/* <StatBox statName="Lists Created" statNumber="5" /> */}
            {/* buttons with respective data */}
            <div className="flex bg-[#171f33] rounded-xl p-1 w-full md:w-auto">
              {buttonsData.map((b) => {
                const isActive = activeTab === b.text;
                return (
                  <button
                    key={b.text}
                    className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg ${
                      isActive
                        ? "bg-[#adc6ff] text-[#002e6a]"
                        : "text-[#c2c6d6] hover:text-[#dae2fd]"
                    }`}
                    onClick={() => {
                      setActiveTab(b.text);
                    }}
                  >
                    {b.text}
                  </button>
                );
              })}
            </div>
            {/* Sort and filter methods will a next version features */}
            {/* <ComboBox label="Sort by" name="sort" options={sorting} />
            <ComboBox label="Genre" name="genre" options={genres} /> */}
            {/* {userStatusArr.map(())} */}
            {reviewsOn ? (
              userReviews.map((review, index) => {
                return (
                  <div className="flex flex-col gap-6">
                    <ProfileReviews
                      posterBase={`${basePosterPath}${reviewPosterWidth}`}
                      review={review}
                      key={review.tmdb_id}
                    />
                  </div>
                );
              })
            ) : (
              <ProfileFilms
                list={listOnDisplay}
                posterBase={`${basePosterPath}${smallBannerWidth}`}
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
export default Profile;
