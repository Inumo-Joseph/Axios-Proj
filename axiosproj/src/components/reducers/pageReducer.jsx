import { createSlice } from '@reduxjs/toolkit';


//slicer that sets current page for fetching 
const initialState = {
  currentPage: 1, //initial state is set to 1
};

const pageSlice = createSlice({ // creates a reducer that changes the currentPage variable based on what is passed
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload; 
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;