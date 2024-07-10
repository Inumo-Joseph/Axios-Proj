import React from "react";

//set of Genres id and name
export const GENRES =
    [ {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]

    //columns for MUI Data Grid
    export const COLUMNS = [
        { field: "id", headerName: "TMDB-ID" },
        { field: "title", headerName: "Title", width: 200 },
        { field: "rating", headerName: "Rating", width: 80 },
        { field: "genre", headerName: "Genre", width: 200 },
        { field: "description", headerName: "Description", width: 500 },
        {
          // Renders an image element based on the link given in the image row
          field: "image",
          headerName: "Image",
          width: 200,
          renderCell: (params) => (
            <img src={`https://image.tmdb.org/t/p/w92${params.value}`} alt={params.row.title} />
          ),
        },
      ];
      
      