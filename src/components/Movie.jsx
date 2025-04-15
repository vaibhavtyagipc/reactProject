

import axios from '../utils/axios';
import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Cards from './partials/Cards';
import Dropdown from './partials/Dropdown';
import Topnav from './partials/Topnav';

const Movie = () => {
    // Setting document title
    useEffect(() => {
        document.title = "Home Tv | Movies";
    }, []);

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const GetMovie = useCallback(async () => {
        if (loading || !hasMore) return; // Prevent duplicate requests
        setLoading(true); // Set loading state
        try {
            const { data } = await axios.get(`/movie/${category.toLowerCase()}?page=${page}`);
            if (data.results.length > 0) {
                setMovie((prevState) => [...prevState, ...data.results]); // Append new data
                setPage((prevPage) => prevPage + 1); // Increment page number
                setError(null); // Clear any existing errors on success
            } else {
                setHasMore(false); // No more data available
            }
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            setError(`Failed to load movies. Reason: ${error.message}`);
        } finally {
            setLoading(false); // Reset loading state
        }
    }, [category, page, loading, hasMore]);

    // Reset data when category changes
    useEffect(() => {
        setPage(1);
        setMovie([]);
        setHasMore(true);
    }, [category]);

    // Fetch data on mount and when category or page updates
    useEffect(() => {
        GetMovie();
    }, [GetMovie]);

    // Display a loading message if still fetching
    if (!movie.length && !error && loading) {
        return <div>Loading...</div>;
    }

    // Display error message if any
    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    // Main JSX rendering with InfiniteScroll
    return (
        <div className="w-screen h-screen overflow-hidden overflow-y-auto">
            <div className="px-[5%] w-full flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-zinc-400">
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-fill"
                    ></i>{" "}
                    Movie <small className='ml-2 text-sm text-zinc-600'>({category})</small>
                </h1>
                <div className="flex items-center w-[80%]">
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["popular", "top_rated", "upcoming", "now_playing"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <div className="w-[2%]"></div>
                </div>
            </div>
            <InfiniteScroll
                dataLength={movie.length} // Length of current data
                next={GetMovie} // Fetch next batch of data
                hasMore={hasMore} // Continue fetching if more data is available
                loader={<h1>Loading...</h1>} // Loader for next batch
            >
                <Cards data={movie} title="movie" />
            </InfiniteScroll>
        </div>
    );
};

export default Movie;

