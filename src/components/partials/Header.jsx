import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({data}) => {

  
  return (
 
    <div 
    style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
      data.backdrop_path || data.profile_path})`,
      backgroundPosition: 'top 5%',
      backgroundSize:"cover"

    }}
    className='w-full h-[50vh] flex flex-col justify-end items-start p-[5%]'>
      <h1 className='w-[70%] text-5xl font-black text-white'>
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className='w-[70%] mt-3 mb-3 text-white'>{data.overview.slice(0,200)}...<Link to={`/${data.media_type}/details/${data.id}`}
      className='text-blue-400'>more</Link></p>
      
      <p className='text-white'>

      <i class=" text-yellow-400 ri-movie-2-fill"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className='p-4 rounded text-white mt-5 bg-[#6556CD]'>
      {""}
      Watch Trailer
      </Link>
    </div>
  )
}

export default Header
