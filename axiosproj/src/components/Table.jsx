import React from "react";
import { Box, ThemeProvider, colors, textFieldClasses } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMovieListQuery } from "./reducers/baseQuery.js";
import { setPage } from "./reducers/pageReducer.js";
import { useDispatch, useSelector } from 'react-redux';
import { COLUMNS } from "./Options.jsx";
import { row } from "./utils/Util.js";


const Table = () => {

  const dispatch = useDispatch(); 
  const currentPage = useSelector((state) => state.page.currentPage) //currentPage variable from store 
  const { data, isFetching} = useGetMovieListQuery(currentPage); // get movie api and set data and isfetching variables

  
    //handles the pagination
    const handlePageChange = async (newModel) => {
     //newmodel is the pagination model that is automatically passed when the button is clicked
      window.scrollTo(0, 0);// scrolls back to top of page
      
      const newPage = newModel.page + 1; //new page is set to that pagination model and incremented
      if (newPage > currentPage) { 
        //if the incremented page is greater than current page then dispathed setPage useSelector to incremented page
        dispatch(setPage(currentPage + 1));
      } else {
        //else decremented
        dispatch(setPage(currentPage -1));
        
      }
    };
    

    return (
      <div className="container">
        {/* returns movie table box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            fontWeight: "bold",
            p: 2,
            backgroundColor: "black",
            color: "white",
          }}
        >
          {"CURRENT MOVIE TABLE "}
        </Box>
        <hr></hr>
        {/* conditional rendering based on if data is currently being fetched */}
        { isFetching? ( "LOADING....") : (
          
          <DataGrid
          rows={row(data)}//row function taken from Util.js and data is passed 
          columns={COLUMNS}// Column from Options.jsx
          paginationMode="server"     
          paginationModel={{ page: currentPage - 1, pageSize: 20 }} //pagination set to one less than current page
          onPaginationModelChange={handlePageChange}
          rowCount={Math.round(data.total_pages )} // Assuming 20 items per page
          rowHeight={80}
          pageSizeOptions={[20]}
          page={currentPage - 1} 
        />
        )
      }
        
      </div>
    );
  }


export default (Table);
