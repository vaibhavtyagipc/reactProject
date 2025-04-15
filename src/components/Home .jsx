
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Sidenav from './partials/Sidenav';
import Topnav from './partials/Topnav';
import axios from '../utils/axios';
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';
import Loading from './Loading';

const Home = () => {
  document.title = "REACT | HomePage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = useCallback(async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      if (data.results && data.results.length > 0) {
        let randomData = data.results[Math.floor(Math.random() * data.results.length)];
        setWallpaper(randomData);
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      setError("Failed to load wallpaper.");
    }
  }, []);

  const GetTrending = useCallback(async () => {
    try {
      const { data } = await axios.get(`/trending/${category.toLowerCase()}/day`);
      if (data.results) {
        setTrending(data.results);
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      setError(`Failed to load Trendings. Reason: ${error.message}`);
    }
  }, [category]);

  useEffect(() => {
    GetTrending();
    GetHeaderWallpaper();
  }, [category, GetTrending, GetHeaderWallpaper]);

  const dropdownOptions = useMemo(() => ["tv", "movie", "all"], []);

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  if (!wallpaper || !trending) {
    return <Loading/>;
  }

  return (
    <>
      <Sidenav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallpaper} />

        <div className='flex justify-between p-5'>
          <h1 className='text-3xl font-semibold text-zinc-400'>
            Trending
          </h1>

          <Dropdown 
            title="Filter" 
            options={dropdownOptions} 
            func={(e) => setCategory(e.target.value)} 
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  );
};

export default Home;
