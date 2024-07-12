import React from "react";
import { Box, ThemeProvider, Typography, colors, textFieldClasses } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMovieListQuery } from "./reducers/baseQuery.js";
import { setPage } from "./reducers/pageReducer.js";
import { useDispatch, useSelector } from 'react-redux';
import { COLUMNS } from "./Options.jsx";
import { row } from "./utils/Util.js";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const Table = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.page.currentPage); //currentPage variable from store
  const moment = useSelector((state) => state.page.date);     
  const { data, isFetching } = useGetMovieListQuery(currentPage); // get movie api and set data and isfetching variables
  console.log(data);
  console.log(moment)

  //handles the pagination
  const handlePageChange = async (newModel) => {
    //newmodel is the pagination model that is automatically passed when the button is clicked
    window.scrollTo(0, 0); // scrolls back to top of page

    const newPage = newModel.page + 1; //new page is set to that pagination model and incremented
    if (newPage > currentPage) {
      //if the incremented page is greater than current page then dispathed setPage useSelector to incremented page
      dispatch(setPage(currentPage + 1));
    } else {
      //else decremented
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <div className="">
      {/* returns movie table box */}
      <Box
       sx={{
        width: '100%',
      }}
    
      >
        {"CURRENT POPULAR MOVIE TABLE "} 
        <Typography sx={{font:''}}> Current Date {moment}</Typography>
      </Box>
      <hr></hr>
      {/* conditional rendering based on if data is currently being fetched */}
      {isFetching ? (
        "LOADING...."
      ) : (
        <Box
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "rgba(38, 119, 99, 0.8)",
              color: "white", 
            },
          }}
        >
          <div style={{ height: 580}}>
            <DataGrid
              sx={{
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                   
                },
                '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
                boxShadow: 5,
              }}
              
              scrollbarSize={1}
              rows={row(data)} //row function taken from Util.js and data is passed
              columns={COLUMNS} // Column from Options.jsx
              paginationMode="server"
              paginationModel={{ page: currentPage - 1, pageSize: 20 }} //pagination set to one less than current page
              onPaginationModelChange={handlePageChange}
              rowCount={Math.round(data.total_pages)} // Assuming 20 items per page
              rowHeight={130}           
              pageSizeOptions={[20]}
              page={currentPage - 1}
            />
          </div>
        </Box>
      )}
    </div>
  );
};

export default Table;
