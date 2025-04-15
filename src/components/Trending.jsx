

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import Cards from './partials/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    document.title="Home Tv | Trending";
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    // Fetch trending data from API with debouncing and loading state
    const GetTrending = useCallback(async () => {
        if (loading || !hasMore) return; // Prevent duplicate requests
        setLoading(true); // Set loading state
        try {
            const { data } = await axios.get(`/trending/${category.toLowerCase()}/${duration}?page=${page}`);
            if (data.results.length > 0) {
                setTrending((prevState) => [...prevState, ...data.results]); // Append new data
                setPage((prevPage) => prevPage + 1); // Increment page number
                setError(null); // Clear any existing errors on success
            } else {
                setHasMore(false); // No more data available
            }
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            setError(`Failed to load Trending. Reason: ${error.message}`);
        } finally {
            setLoading(false); // Reset loading state
        }
    }, [category, duration, page, loading, hasMore]);

    // Reset data when category or duration changes
    useEffect(() => {
        setPage(1);
        setTrending([]);
        setHasMore(true);
    }, [category, duration]);

    // Fetch data when page is set to 1 (initial fetch)
    useEffect(() => {
        GetTrending();
    }, [GetTrending]);

    // Display loading state when data is being fetched
    if (!trending.length && !error && loading) {
        return <Loading />;
    }

    // Error display if API fails or no data is returned
    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    // Main JSX rendering with InfiniteScroll
    return (
        <div className="w-screen h-screen overflow-hidden overflow-y-auto">
            <div className='px-[5%] w-full flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i
                        onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-fill"
                    ></i>{" "}
                    Trending
                </h1>  
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown
                        title="Category"
                        options={["movie", "tv", "all"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                    <Dropdown
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setDuration(e.target.value)}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={trending.length} // Length of current data
                next={GetTrending} // Fetch next batch of data
                hasMore={hasMore} // Continue fetching if more data is available
                loader={<h1>Loading...</h1>} // Loader for next batch
            >
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    );
};

export default Trending;





