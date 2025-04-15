

import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full h-full p-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`} className='w-[25vh] m-2 relative' key={i}>
          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover rounded-lg'
            src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`}
            alt={c.name || c.title || c.original_name || c.original_title}
          />
          <h1 className="text-center text-zinc-400 text-2xl font-semibold mt-3">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
        {c.vote_average &&  ( <div className='absolute right-[-6%] bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center'>
            {(c.vote_average*10).toFixed()}<sup>%</sup>
          </div>)}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
