import React from 'react'
import { Route,Routes} from "react-router-dom";
import Home from './components/Home '
import Loading from './components/Loading';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import Tvshows from './components/Tvshows';
import People from './components/People';
import Moviedetails from './components/Moviedetails';
import TvDetails from './components/TvDetails';
import PeopleDetails from './components/PeopleDetails';
import Trailer from './components/partials/Trailer';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/trending" element={<Trending/>} />
        <Route path="/popular" element={<Popular/>} />


        <Route path="/movie" element={<Movie/>} />
              <Route
              path="/movie/details/:id"
               element={<Moviedetails/>}
                />
                <Route
                path="/movie/details/:id/trailer"
                element={<Trailer />}
                />
      


        <Route path="/tvshows" element={<Tvshows/>} />
        <Route 
        path="/tvshows/details/:id" element={<TvDetails/>} 
        />
        


        <Route path="/people" element={<People/>} />
       
       
            <Route path="/people/details/:id" element={<PeopleDetails />} />
        
            <Route path="*" element={<NotFound/>} />
      </Routes>
      
    </div>
  )
}

export default App
