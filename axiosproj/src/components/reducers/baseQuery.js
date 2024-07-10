import axios from 'axios';
import { createApi } from  '@reduxjs/toolkit/query/react'



//first we create axios instance that has all the authorizations and that will also act as the base URL for api slicer
const axiosInstance = axios.create({ 
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAzOWU3NmIyODVjODFlNDQ0YmE3NGY3OGEzNzM2OCIsIm5iZiI6MTcyMDAxODI0Mi4yNzg4NTMsInN1YiI6IjY2ODU1Y2YwZTEwMTA0OWU5NTFiYzA5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Dbi3BV2N8g3QW8if6L3zxooQxf3FUOtGeDih12Qn50",
    },
  
  });

  //Create api function 
  export const moviesApi = createApi({
    reducerPath: 'moviesApi', //unique key we will call
    baseQuery: axiosInstance, //base query
    endpoints: (builder) => ({ // this adds the endpoints to out base url
      getMovieList: builder.query({ 
        query: (currentPage) =>  `/discover/movie?include_adult=false&include_video=false&page=${currentPage}&language=en-US&with_genres&sort_by=popularity.desc`,
        method: 'GET'
      }),
    }),
  });
  
  
  export const { useGetMovieListQuery } = moviesApi;