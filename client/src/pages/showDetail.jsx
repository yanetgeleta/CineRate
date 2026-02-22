import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import Navbar from "../layouts/Navbar";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import FilmDetailsComp from "../components/FilmDetailsComp";
import FilmCastCrewComp from "../components/FilmCastCrewComp";
import { useAuth } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
// This is a page that shows details of shows
function ShowDetail() {
  const { showId } = useParams();
  const [showData, setShowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const basePosterPath = "https://image.tmdb.org/t/p/";
  const heroBannerWidth = "w1280";
  const smallBannerWidth = "w300";
  const [showGenres, setShowGenres] = useState(null);
  const { user } = useAuth();
  const [status, setStatus] = useState(null);

  async function statusUpdateCall(filmId, mediaType, updatedStatus) {
    const body = {
      filmId: filmId,
      mediaType: mediaType || filmType,
      filmStatus: updatedStatus,
    };
    const response = await fetch("/api/library/update/film/status", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  }

  useEffect(() => {
    const fetchShowData = async () => {
      setLoading(true);
      try {
        const queryObj = { filmId: showId, filmType: "tv" };
        const params = new URLSearchParams(queryObj);
        const response = await fetch(`/api/tmdb/film/detail?${params}`);
        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch show detail from the backend");
        }
        const json = await response.json();
        const data = json.filmData;
        setShowData(data);
        setShowGenres(data.genres);
      } catch (err) {
        setLoading(false);
        throw new Error("Error fetching show detail form the backend");
      } finally {
        setLoading(false);
      }
    };
    fetchShowData();
  }, [showId]);
  return (
    <div>
      <Navbar user={user} />
      {loading ? (
        <ClipLoader
          loading={loading}
          aria-label="Loading Show Detail Spinner"
          data-testid="loader"
        />
      ) : (
        <div>
          <FilmCard
            src={`${basePosterPath}${heroBannerWidth}${showData.backdrop_path}`}
          />{" "}
          {/* the big background */}
          <FilmCard
            src={`${basePosterPath}${smallBannerWidth}${showData.poster_path}`}
          />{" "}
          {/* the smaller card */}
          <h2>{showData.title || showData.name}</h2>
          <p>{showData.vote_average}</p>
          <p>
            {showData.first_air_date} -{" "}
            {showData.status === "Ended"
              ? showData.last_air_date
              : "Continuing"}
          </p>
          {showGenres.map((genre) => (
            <Button key={genre.id}>{genre.name}</Button>
          ))}
          <IconButton>
            <BookmarkAddOutlinedIcon
              onClick={() => {
                if (!status || status === "dropped" || status === "watched") {
                  setStatus("watchlist");
                  statusUpdateCall(item.id, item.media_type, "watchlist");
                } else {
                  setStatus("dropped");
                  statusUpdateCall(item.id, item.media_type, "dropped");
                }
              }}
            />{" "}
            Add to Watchlist
          </IconButton>
          <IconButton>
            <StarIcon /> Rate
          </IconButton>
          <IconButton>
            <CreateIcon /> Write a Review
          </IconButton>
          <Button>Details</Button>
          <Button>Cast & Crew</Button>
          <Button>Seasons</Button>
          <Button>Reviews</Button>
          <FilmDetailsComp filmData={showData} />
          <FilmCastCrewComp filmCredits={showData.credits} />
          {/* Each button will render its respective information */}
        </div>
      )}
    </div>
  );
}
export default ShowDetail;
