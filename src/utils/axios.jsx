import axios from "axios";

const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2U5NTg5MjYzYjUxODNlNTMxYTViYTkzODQ5MmQ2NSIsIm5iZiI6MTcyNjMyMDQ2OS4wMDMzNzIsInN1YiI6IjY2ZTQ1MGVhMDAwMDAwMDAwMGI5YmYyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EE7Ei1Q5vljZItpQpNyDFfUmjTvFUjBF7Vq9I08con4'
      },
    

});


export default instance;