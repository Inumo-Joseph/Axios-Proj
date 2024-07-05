import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "../actions/baseQuery";
import { setupListeners } from "@reduxjs/toolkit/query";


const store = configureStore({
//out store gets configured with the using the API slice reducer we created. 
    reducer:{ [moviesApi.reducerPath]: moviesApi.reducer
    },

// RTK query  middleware that enables caching, invalidation and polling
//used here just for the sake of it
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),

});

//optional but setupListensers doc lists as required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export default store