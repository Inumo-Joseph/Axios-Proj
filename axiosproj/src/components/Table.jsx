import React from "react";
import { connect } from "react-redux";
import { Box, ThemeProvider, colors, textFieldClasses } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useGetMovieByNameQuery } from "../actions/baseQuery";

const Table = () => {
//AS OF NOW DOES NOT IMPLEMENT REDUX 

  const [movies, setMovies] = useState([]); // the movie use state that holds the fetch movie data
  const [genres, setGenres] = useState([]); // holds the fetched genre data genre name and corresponding ID
  const [currentPage, setCurrentPage] = useState(1); // currentpage is set to 1 as the Movie DataBase is 1-indexed
  const [totalPages, setTotalPages] = useState(0); // total number of pages

  //async function that fetches the genre list and corresponding IDS from API
  const fetchGenre = async () => {

    const options = {
      method: "GET", //HTTP GET

      headers: { 
        accept: "application/json", // return and acccpets Json
        Authorization: //Autorization Token
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAzOWU3NmIyODVjODFlNDQ0YmE3NGY3OGEzNzM2OCIsIm5iZiI6MTcyMDAxODI0Mi4yNzg4NTMsInN1YiI6IjY2ODU1Y2YwZTEwMTA0OWU5NTFiYzA5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Dbi3BV2N8g3QW8if6L3zxooQxf3FUOtGeDih12Qn50",
      },
    };

    try {
        // fetched from API endpoint
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options
      );
      setGenres(response.data.genres); //set to usestate genre
    } catch (error) {
      console.error(error); //error handling
    }
  };


  //fetchGenre called first because we need genres in our fetchMovie function

  const fetchMovie = async (page) => {
   //will fetch databases entire list of movies 
   // page: currentPage is passed through as parameter and used in fetching
    const options = { 
      method: "GET",
      headers: {
        accept: "application/json", //similiar setup to fetchGenre method
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAzOWU3NmIyODVjODFlNDQ0YmE3NGY3OGEzNzM2OCIsIm5iZiI6MTcyMDAxODI0Mi4yNzg4NTMsInN1YiI6IjY2ODU1Y2YwZTEwMTA0OWU5NTFiYzA5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Dbi3BV2N8g3QW8if6L3zxooQxf3FUOtGeDih12Qn50",
      },
    };

    try {
      const response = await axios.get(  //specific page of Movie lit is fetched
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${page}&language=en-US&with_genres&sort_by=popularity.desc`,
        options
      );
      setMovies(response.data.results);// resulting array is stored in movies usestate
      setTotalPages(response.data.total_pages);// total pages is stored
    
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchGenre(); // first useEffect for genres
  }, []);

  useEffect(() => {
    fetchMovie(currentPage);
    console.log("current Page", currentPage) //second useEfect for movie
  }, [currentPage]); //initialized to currentPage


  //conditional rendering, IF niehter use state is filled then puts loading screen
  if (movies.length === 0 && genres.length === 0) {
    console.log("LOADING......");
    return <div>Loading...</div>;
  }
   else
  {
    //row object of Datagrid is created
    //created by iterating through the movies array 
    const row = movies.map((movie, index) => {
      let currentGenre = "";// current id variable created
      
      //then genre the genre_ids field the movie object is iterated through
     // eg.  genre_id= [9, 109, 86] holds the id of the various movie genres
      movie.genre_ids.map((id) => {
        
        genres.find((genre) => {
           //using the current id the genre is found with in the gneres Array and then that name is added to the currentGenre variable
          if (genre.id === id) {
            currentGenre += " " + genre.name;
          }
        });
      });

      return {
        id: movie.id,
        title: movie.title,
        genre: currentGenre,
        image: movie.poster_path,
        rating: movie.vote_average,
        description: movie.overview,
      };
    });

    //Columns for Datagrid component
    const columns = [
      { field: "id", headerName: "TMDB-ID" },
      { field: "title", headerName: "Title", width: 200 },
      { field: "rating", headerName: "Rating", width: 80},
      { field: "genre", headerName: "Genre", width: 200 },
      { field: "description", headerName: "Description", width: 300,},
      {
        //Renders an image element based on the link given in the image row
        field: "image",
        headerName: "Image",
        width: 200,

        renderCell: (params) => (
          <img
            src={`https://image.tmdb.org/t/p/w92${params.value}`}
            alt={params.row.title}
          />
        ),
      },
    ];

    //handles the pagination
    const handlePageChange = async (newModel) => {
    
        console.log('New pagination model:', newModel.page);
      const newPage = newModel.page + 1
      if(newPage>currentPage)
        {

            console.log("Changing to " + currentPage + "one");
            setCurrentPage(currentPage + 1);
            fetchMovie(currentPage);
            
        }
      
        else{
            console.log("Changing to " + currentPage + "minus one")
            setCurrentPage(currentPage -1);
            fetchMovie(currentPage);
        }
    
    
    };

    return (
      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            fontWeight: "bold",
            p: 2,
            backgroundColor: 'black',
            color:'white'
          }}
        >
          {"CURRENT MOVIE TABLE "}
        
        </Box>
        <hr></hr>
        <DataGrid
          rows={row}
          columns={columns}
          paginationMode="server"
          paginationModel={{ page: currentPage-1, pageSize: 20 }}
          onPaginationModelChange={ handlePageChange}
          rowCount={Math.round(totalPages/20)} // Assuming 20 items per page
          rowHeight={80}
          pageSizeOptions={[20]}
          page={currentPage - 1}
        />

      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  table: state.table,
});

const mapDispatchToProps = (dispatch) => ({
  get: () => dispatch({ type: "GET" , payload: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${page}&language=en-US&with_genres&sort_by=popularity.desc`}),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
