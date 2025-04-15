import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";

  // Fetch movie details from Redux
  const movieData = useSelector((state) => state[category]);

  console.log("Redux Store Data:", movieData); // Debugging log

  // Get the first YouTube trailer
  const ytvideo = movieData?.info?.videos?.results?.find(video => 
    video.site === "YouTube" && video.type === "Trailer"
  );

  console.log("YouTube Video Data:", ytvideo); // Debugging log

  if (!ytvideo || !ytvideo.key) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Fetching Trailer...
      </div>
    );
  }

  return (
    <div className="absolute top-0 z-[100] bg-[rgba(0,0,0,0.9)] left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] text-3xl text-white right-[5%] top-[5%]"
      >
        ✖
      </Link>

      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        controls={true}
        width="100%"
        height="100%"
        playing={true} // Autoplay enabled
      />
    </div>
  );
};

export default Trailer;






// import React from 'react'
// import ReactPlayer from 'react-player'
// import { useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import NotFound from '../NotFound';


// const Trailer = () => {
//   const navigate=useNavigate();
//   const{pathname}=useLocation();
//   const category =pathname.includes("movie")?"movie":"tv";
//   const ytvideo = useSelector((state)=>state[category].info.videos);
//   console.log(ytvideo);

//   return (
//     <div className='absolute top-0 z-[100] bg-[rgba(0,0,0,9)] left-0 w-screen h-screen flex items-center justify-center '>
//       <Link
//       onClick={()=>navigate(-1)}
//       className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]'
//       >
      
//       </Link>
      
//      {ytvideo ? (
//        <ReactPlayer
//        height={800} 
//        width={1500}
//        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
       
//        />
//       ):(
//       <NotFound/>
//      )}
//     </div>
//   )
// };

// export default Trailer;


// import React from 'react';
// import { useSelector } from 'react-redux';

// const Trailer = () => {
//   // Safely select the videos data using optional chaining
//   const videos = useSelector((state) => state?.media?.videos);

//   // Add a conditional check for videos to handle cases when videos is null or undefined
//   if (!videos) {
//     return <div>No trailers available</div>;
//   }

//   return (
//     <div>
//       <h2>Trailer</h2>
//       {/* Render video elements if videos exist */}
//       {videos.length > 0 ? (
//         videos.map((video) => (
//           <div key={video.id}>
//             <h3>{video.title}</h3>
//             {/* Assume there’s a video URL or key to embed the video */}
//             <iframe
//               src={`https://www.youtube.com/embed/${video.key}`}
//               title={video.title}
//               allowFullScreen
//             />
//           </div>
//         ))
//       ) : (
//         <p>No videos available</p>
//       )}
//     </div>
//   );
// };

// export default Trailer;




// import React, { useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import { useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Trailer = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const category = pathname.includes("movie") ? "movie" : "tv";
  
//   // Fetch the video data from Redux state
//   const ytvideo = useSelector((state) => state[category]?.info?.videos);

//   // Debugging: log the ytvideo to check if it has the right structure
//   useEffect(() => {
//     console.log("ytvideo data:", ytvideo); 
//   }, [ytvideo]);

//   // Check if video data is valid and contains a key
//   const videoKey = ytvideo && ytvideo.length > 0 ? ytvideo[0]?.key : null;

//   return (
//     <div className='absolute top-0 z-[100] bg-[rgba(0,0,0,0.9)] left-0 w-screen h-screen flex items-center justify-center'>
//       {/* Close Button */}
//       <Link
//         onClick={() => navigate(-1)}
//         className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]'
//       >
//         &times;
//       </Link>

//       {/* Render trailer only if videoKey exists */}
//       {videoKey ? (
//         <ReactPlayer
//           height="80%" 
//           width="80%" 
//           url={`https://www.youtube.com/watch?v=${videoKey}`} 
//           controls 
//         />
//       ) : (
//         <p className="text-white">Trailer not available</p>
//       )}
//     </div>
//   );
// }

// export default Trailer;

// import React, { useEffect, useState } from 'react';
// import ReactPlayer from 'react-player';
// import { useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Trailer = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const category = pathname.includes("movie") ? "movie" : "tv";

//   // Fetch the video data from Redux state
//   const ytvideo = useSelector((state) => state[category]?.info?.videos);

//   const [loading, setLoading] = useState(true);

//   // Debugging: log the ytvideo to check if it has the right structure
//   useEffect(() => {
//     console.log("Full ytvideo data:", ytvideo); // Log full ytvideo data
//     if (ytvideo && ytvideo.length > 0) {
//       setLoading(false); // Mark loading as complete once ytvideo is fetched
//     } else {
//       console.log("No trailer data found.");
//     }
//   }, [ytvideo]);

//   // Check if video data is valid and contains a key
//   const videoKey = ytvideo && ytvideo.length > 0 ? ytvideo[0]?.key : null;

//   // Loading state while the data is being fetched
//   if (loading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   return (
//     <div className='absolute top-0 z-[100] bg-[rgba(0,0,0,0.9)] left-0 w-screen h-screen flex items-center justify-center'>
//       {/* Close Button */}
//       <Link
//         onClick={() => navigate(-1)}
//         className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]'
//       >
//         &times;
//       </Link>

//       {/* Render trailer only if videoKey exists */}
//       {videoKey ? (
//         <ReactPlayer
//           height="80%" 
//           width="80%" 
//           url={`https://www.youtube.com/watch?v=${ytvideo.id}`} 
//           controls 
//         />
//       ) : (
//         <p className="text-white">Trailer not available</p>
//       )}
//     </div>
//   );
// }

// export default Trailer;

// import React, { useEffect, useState } from 'react';
// import ReactPlayer from 'react-player';
// import { useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const Trailer = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const category = pathname.includes("movie") ? "movie" : "tv";
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch the video data from Redux state
//   const ytvideo = useSelector((state) => state[category]?.info?.videos);

//   useEffect(() => {
//     if (ytvideo && ytvideo.length > 0) {
//       console.log("Trailer found:", ytvideo[0]);
//       setLoading(false); // Set loading to false when trailer data is found
//     } else {
//       setLoading(false);
//       setError("No trailer data available.");
//       console.log("No trailer data found.");
//     }
//   }, [ytvideo]);

//   // Check if video data is valid and contains an id or key
//   const videoId = ytvideo && ytvideo.length > 0 ? ytvideo[0]?.id : null;
//   console.log("Video ID:", videoId); // Log the video ID

//   if (loading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-white">{error}</div>;
//   }

//   return (
//     <div className='absolute top-0 z-[100] bg-[rgba(0,0,0,0.9)] left-0 w-screen h-screen flex items-center justify-center'>
//       <Link
//         onClick={() => navigate(-1)}
//         className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]'
//       >
//         &times;
//       </Link>

//       {/* Render trailer only if videoId exists */}
//       {videoId ? (
//         <ReactPlayer
//           height="80%" 
//           width="80%" 
//           url={`https://www.youtube.com/watch?v=${videoId}`} 
//           controls 
//         />
//       ) : (
//         <p className="text-white">Trailer not available</p>
//       )}
//     </div>
//   );
// }

// export default Trailer;



















