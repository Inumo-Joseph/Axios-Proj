import axiosInstance from "./axiosInstance";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query";


const axiosquery = async ({url, method, data, params}) =>{

    try {
        result= await axiosInstance(url, method, data, params)
        return {data: result.data}
    }
    catch (axiosError){
        console.log(axiosError)
        return{
            error: {
                status: axiosError.response,
                data: axiosError.data
            }
        }
    }
}

export const moviesApi = createApi({

    name:'fetch',
    initialState: {
        isLoading: false, 
        data:[],
        isError: false,
        currentPage: 1,
    },


   reducerPath:'movieApi',
   baseQuery: axiosquery,
   endpoints: (builder) => ({
   getMovieList: builder.query({
    query: ()=> ({url: `/movie?include_adult=false&include_video=false&page=${currentPage}&language=en-US&with_genres&sort_by=popularity.desc`})
   })


   })

})


export const { useGetMovieByNameQuery} = moviesApi