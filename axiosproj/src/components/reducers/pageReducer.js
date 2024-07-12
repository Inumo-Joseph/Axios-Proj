import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';

//slicer that sets current page for fetching 
const initialState = {
  currentPage: 1, //initial state is set to 14
  date: moment().format("MM-DD-YYYY")

};

console.log(JSON.stringify(initialState)); // This should not throw an error


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