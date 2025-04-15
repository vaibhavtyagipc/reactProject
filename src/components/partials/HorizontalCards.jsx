// import React from 'react'
// import { Link } from 'react-router-dom'



// const HorizontalCards = ({data}) => {
//   return (  
//     <div className='w-[100%] flex overflow-y-hidden mb-5 p-5'>
//       {data.map((d, i) => (
//         <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[15%] h-[35vh] mr-5 mb-5 bg-zinc-800'>
//           <img
//             className='w-full h-[55%] object-cover'
//             src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`}
//             alt=''
//           />

//           <div className='text-white p-3 h-[45%] overflow-y-auto'>
//             <h1 className='text-xl font-semibold'>
//               {d.name || d.title || d.original_name || d.original_title}
//             </h1>
//             <p>
//               {d.overview ? `${d.overview.slice(0, 50)}...` : 'No overview available'} 
//               <span className='text-zinc-400'>more</span>
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   ); 
// };

// export default HorizontalCards;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const HorizontalCards = ({ data }) => {
//   return (
//     <div className="w-full flex overflow-x-scroll mb-5 p-5">
//       {
//         data.map((d, i) => (
//           <Link
//             to={`/${d.media_type}/details/${d.id}`}
//             key={i}
//             className="min-w-[15%] h-[35vh] mr-5 mb-5 bg-zinc-800"
//           >
//             <img
//               className="w-full h-[55%] object-cover"
//               src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`}
//               alt={d.name || d.title || 'Image'}
//             />
//             <div className="text-white p-3 h-[45%] overflow-y-auto">
//               <h1 className="text-xl font-semibold">
//                 {d.name || d.title || d.original_name || d.original_title || 'No Title'}
//               </h1>
//               <p>
//                 {d.overview ? `${d.overview.slice(0, 50)}...` : 'No overview available'}{' '}
//                 <span className="text-zinc-400">more</span>
//               </p>
//             </div>
//           </Link>
//         ))
// }
//     </div>
//   );
// };

// export default HorizontalCards;



import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalCards = ({ data }) => {
  // Check if data is defined and log it to ensure it's coming through correctly
  console.log("Data received:", data);

  return (
    <div className="w-full flex overflow-x-scroll mb-5 p-5">
      {data && data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-[35vh] mr-5 mb-5 bg-zinc-800"
          >
            {d.backdrop_path || d.poster_path ? (
              <img
                className="w-full h-[55%] object-cover"
                src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`}
                alt={d.name || d.title || 'Image'}
              />
            ) : (
              <div className="w-full h-[55%] bg-gray-500 flex items-center justify-center">
                <span className="text-white">No Image</span>
              </div>
            )}
            <div className="text-white p-3 h-[45%] overflow-y-auto">
              <h1 className="text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title || 'No Title'}
              </h1>
              <p>
                {d.overview ? `${d.overview.slice(0, 50)}...` : 'No overview available'}{' '}
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">Nothing to Show</h1>
      )}
    </div>
  );
};

export default HorizontalCards;


