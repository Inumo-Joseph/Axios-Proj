
import { GENRES } from "../Options";

export function row (data) { 
   return data.results.map((movie) => {
        let currentGenre = ""; // current id variable created
        
        //then genre the genre_ids field the movie object is iterated through
        // eg.  genre_id= [9, 109, 86] holds the id of the various movie genres
        movie.genre_ids.map((id) => {
          GENRES.find((genre) => {
            //using the current id the genre is found with in the gneres Array and then that name is added to the currentGenre variable
            if (genre.id === id) {
              currentGenre += " | " + genre.name;
            }
          });   
        });    
        
        return {// returns the fields that will be filled in the table
          id: movie.id,
          title: movie.title,
          releaseD: movie.release_date,
          genre: currentGenre,
          image: movie.poster_path,
          rating: movie.vote_average,
          description: movie.overview,
        };

      });

} 
