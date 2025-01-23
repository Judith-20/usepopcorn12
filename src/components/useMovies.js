import { useEffect, useState } from "react";
// creating custom hooks(reusable hooks)

const KEY = "36968d25";
// query is passed here not as a props but as an argument. for the handleclosed movie function here we would use callback also as an argumnet
// export function useMovies(query, callback) {
export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {

            // callback?.()
          // the cleanup function to handle http request, such that the request will be fetch when the user is done inputing the movie title. we use abort controller(browser api, has nothing to do with react, just the browser just like fetch). connecting the abort controller with the fetch add the signal
          const controller = new AbortController();
    
          async function fetchMovies() {
            // setIsLoading(true)
            // const res = await fetch(
            //   `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
            // );
            // const data = await res.json();
            // setMovies(data.Search);
            // setIsLoading(false)
    
            // handling errors
            try {
              setIsLoading(true);
              // to remove the error when the user has not searched for the movie
              setError("");
              // const res = await fetch(
              //   `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
              // );
    
              const res = await fetch(
                `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
    
              // handling error if there is no internet coonection
              if (!res.ok)
                throw new Error("Something went wrong with fetching movies");
    
              const data = await res.json();
              // handling error ehen there is no response or when the movie u are searching 4 is not found
              if (data.Response === "False") throw new Error("Movie not found!");
    
              setMovies(data.Search);
              setError("");
              // setIsLoading(false) to remove the isloading if you can't get the movies move it to finally
            } catch (err) {
              console.error(err.message);
              // setError(err.message);
              if (err.name !== "AbortError") {
                setError(err.message);
              }
            } finally {
              setIsLoading(false);
            }
          }
    
          // add a condition to not display anything if the search bar is empty or has letters < 3
          // if (!query.length) {
          //   setMovies([])
          //   setError("")
          //   return;
          // }
    
          if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
    
          // to ensure that when you click on a movie and the details is shown and when u want to search for another movie, the previous movie details closes
        //   handleCloseSelectedMovie();
    
          fetchMovies();
    
          // cleanup function for data fetching
          return function () {
            controller.abort(); // but this will throw an error as the user searches for movie cos as the user types in another letter, the previous request is aborted which is an error in js which is caught and displayed on the screen, to avoid this- if(err.name !== AbortError) - check above
          };
        },
        // [query, callback]
        [query]
      );
    //   passing them as props or destructuring the objects so they can be used in app.js
  return {movies, isLoading, error}
}
