import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import FilmCard from "../components/FilmCard";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
// This is the home page that users see when they search for site

// env.config({path: '../.env'});
function Home() {
    const [trendingToday, setTrendingToday] = useState(null);
    const [trendingWeekly, setTrendingWeekly] = useState(null);
    const [newMovies, setNewMovies] = useState(null);
    const [topMovies, setTopMovies] = useState(null);
    const [topShows, setTopShows] = useState(null);

    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const basePosterPath = 'https://image.tmdb.org/t/p/';
    const bannerWidth = 'w780';

    // fetches data from the backend for the home page
    useEffect(()=> {
        const fetchHomeData = async ()=> {
            try {
                const [trendingTodayRes, trendingWeeklyRes, newMoviesRes, topMoviesRes, topShowsRes] = await Promise.all([
                    fetch('/api/tmdb/trending/today'),
                    fetch('/api/tmdb/trending/weekly'),
                    fetch('/api/tmdb/new/movies'),
                    fetch('/api/tmdb/top/movies'),
                    fetch('/api/tmdb/top/shows')
                ])
                if (!trendingTodayRes.ok || !trendingWeeklyRes.ok || !newMoviesRes.ok || !topMoviesRes.ok || !topShowsRes.ok) throw new Error('Failed to fetch home data');
                const [trendingTodayData, trendingWeeklyData, newMoviesData, topMoviesData, topShowsData] = await Promise.all([
                    trendingTodayRes.json(),
                    trendingWeeklyRes.json(),
                    newMoviesRes.json(),
                    topMoviesRes.json(),
                    topShowsRes.json()
                ])
                setTrendingToday(trendingTodayData);
                setTrendingWeekly(trendingWeeklyData);
                setNewMovies(newMoviesData);
                setTopMovies(topMoviesData);
                setTopShows(topShowsData);
                console.log(trendingToday);

            }
            catch(err) {
                console.log("Failed to fetch home data from backend: ", err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchHomeData();
    }, []);
    
    if(loading) return <div>Loading films...</div>
    const bannerFilm = trendingToday?.results;

    return (
        <div>
            <Navbar />
            {/* Banner for trending movies and shows daily */}
            {trendingToday.results.map((film, index)=> {
                return <FilmCard src={`${basePosterPath}${bannerWidth}${film.poster_path}`} />
            })}
            <h2>Title</h2>
            <p>Description</p>
            <Button>Watch Trailer</Button>

            <h2>Trending</h2>
            <FilmCard/>
            {/* Multiple data will come here from weeky, trending movies and shows will be shows here */}
            <h2>New Releases</h2>
            <FilmCard />
            {/* Multiple data will come for newly releases movies */}
            <h2>Top Rated Movies</h2>
            <FilmCard />
            <h2>Top Rated Shows</h2>
            <FilmCard />
            {/* Multiple films from topMovies and topShows */}
        </div>
    )
}

export default Home;