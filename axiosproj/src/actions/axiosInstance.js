import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/discover',
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAzOWU3NmIyODVjODFlNDQ0YmE3NGY3OGEzNzM2OCIsIm5iZiI6MTcyMDAxODI0Mi4yNzg4NTMsInN1YiI6IjY2ODU1Y2YwZTEwMTA0OWU5NTFiYzA5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Dbi3BV2N8g3QW8if6L3zxooQxf3FUOtGeDih12Qn50",
  },

});

export default axiosInstance;