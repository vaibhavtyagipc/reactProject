
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import noimage from '/noimage.jpg';

const Topnav = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    if (!debouncedQuery.trim()) {
      return;
    }

    try {
      const { data } = await axios.get(`/search/multi?query=${debouncedQuery}`);
      setSearches(data.results);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    GetSearches();
  }, [debouncedQuery]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-zinc-400 text-3xl ri-search-2-line"></i>

      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search here"
      />

      {query.length > 0 && (
        <i onClick={() => setQuery('')} className="text-zinc-400 text-3xl ri-close-line"></i>
      )}

      <div className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] overflow-auto left-[5%] shadow-lg">
        {searches.length === 0 && query.trim().length > 0 && (
          <div className="p-5 text-zinc-500">No results found.</div>
        )}

        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type === 'movie' ? 'movie' : 'tv'}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-100 duration-300 font-semibold text-zinc-600 p-5 flex justify-start items-center border-b-2 border-zinc-100 w-[100%]"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mx-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                  : noimage
              }
              alt={s.name || s.title}
            />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;

