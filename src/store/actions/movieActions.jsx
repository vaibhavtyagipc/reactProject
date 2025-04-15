// import axios from "../../utils/axios";
// import { loadmovie } from "../reducers/movieSlice";
// export {removemovie} from "../reducers/movieSlice";

// export const asyncloadmovie =(id)=> async(dispatch,getState)=>{
//     try{
//         const detail = await axios.get(`/movie/${id}`);
//         const externalid = await axios.get(`/movie/${id}/external_ids`);
//         const recommendations = await axios.get(`/movie/${id}/recommandation`);
//         const similar = await axios.get(`/movie/${id}/similar`);
//         const videos  = await axios.get(`/movie/${id}/videos`);
//         const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        
//         let theultimatedetails ={
//             detail:detail.data,
//             externalid: externalid.data,
//             recomendations:recomendations.data.results,
//             similar:similar.data.results,
//             videos:videos.data.results.find((m)=> m.type=== "Trailer"),
//             watchproviders: watchproviders.data.results.IN,
//         };

//    dispatch(loadmovie(theultimatedetails));
//     }
//     catch(error){
//         console.log("Error:",error);
//     }
// };
 


import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`); // Corrected spelling
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results, // Corrected spelling
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results?.IN,
      translations:translations.data.translations.map((t)=>t.english_name),
    };

    dispatch(loadmovie(theUltimateDetails));
  } catch (error) {
    console.error("Error:", error);
   
  }
};



