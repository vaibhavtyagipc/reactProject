
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import HorizontalCards from './partials/HorizontalCards';

const Moviedetails = () => {
  const {pathname}=useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info, loading, error } = useSelector(state => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  // If loading or error, return early
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  // Handle missing or incomplete movie details
  if (!info || !info.detail) return <div className="text-center text-red-500">Loading...</div>;

  const backdropPath = info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : 'https://via.placeholder.com/1500x800?text=Image+Not+Available';

  const posterPath = info?.detail?.poster_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path}`
    : 'https://via.placeholder.com/300x450?text=Poster+Not+Available';

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(${backdropPath})`,
        backgroundPosition: 'top 5%',
        backgroundSize: 'cover'
      }}
      className=" relative w-screen h-[140vh] px-[10%]"
    >
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 ">
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD]">
          <i className="ri-arrow-left-fill"></i> Back
        </Link>

        {info?.detail?.homepage && (
          <a target='_blank' rel="noopener noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-line"></i> Official Site
          </a>
        )}
        {info?.externalid?.wikidata_id && (
          <a target='_blank' rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${info.externalid.wikidata_id}`}>
            <i className="ri-earth-fill"></i> Wikipedia
          </a>
        )}
        {info?.externalid?.imdb_id && (
          <a target='_blank' rel="noopener noreferrer" href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
            IMDb
          </a>
        )}
      </nav>


      {/* part.2........... */}

      <div className="w-full flex "> 
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover rounded-lg"
          src={posterPath}
          alt="Movie Poster"
        />

      <div className='content ml-[5%] text-white'>

        <h1 className='text-5xl font-black text-white'> {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}


         <small 
         className='text-2xl font-bold text-zinc-200'>
        ({info.detail.release_date.split("-")[0]})
         </small>

        </h1>

     <div className='mt-3 mb-7 flex text-white items-center gap-x-5'> 

       <span className='rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center'>
          {(info.detail.vote_average*10).toFixed()}<sup>%</sup>
          </span >
          <h1 className='text-yellow-600 w-[60px] font-semibold text-2xl leading-6'>User Score</h1>
          <h1 className=''> ({info.detail.release_date})</h1>
          <h1>{info.detail.genres.map((g)=>g.name).join(",")}</h1>
          <h1>{info.detail.runtime}min</h1>
       </div>
     
   <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>

   <h1 className='text-2xl mb-3 mt-5'>Overview</h1>
   <p>{info.detail.overview}</p>


   <h1 className='text-2xl mb-3 mt-5'>Translations</h1>
   <p className='mb-10' >{info.translations.join(", ")}</p>

   <Link className='p-5 bg-[#6556CD] rounded-lg'
    to={`${pathname}/trailer`}>
    <i class="ri-play-fill mr-3"></i>
      Play Trailer
      </Link>

      </div>


      </div>

      {/* part3.................... */}

      <div className="w-[80%] flex flex-col gap-5 mt-10">
        {info?.watchproviders?.flatrate?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold">Available for Streaming</h3>
            <div className="mt-2 flex gap-2">
              {info?.watchproviders?.flatrate?.map((provider) => (
                <img
                  key={provider.provider_id}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                  alt={`${provider.provider_name} logo`}
                />
              ))}
            </div>
          </div>
        )}
        
        {info?.watchproviders?.rent?.length > 0 && (
          <div>
            <h3 className="text-lg font-bold ">Available for Rent</h3>
            <div className="mt-2 flex gap-2">
              {info?.watchproviders?.rent?.map((provider) => (
                <img
                  key={provider.provider_id}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                  alt={`${provider.provider_name} logo`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* part..4........recomendation and similarity... */}

  <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-300'/>
  <h1 className='text-3xl font-bold text-white'>Recommendations And Similar</h1>
    <HorizontalCards
    data=
      {info.recommendations ? info.recommendations : info.similar}

      />


    </div>
  );
};

export default Moviedetails;









