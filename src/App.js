// import { useEffect, useState } from "react";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
// import StarRating from "./StarRating";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// sent to custom hook file
// const KEY = "36968d25";

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);

  // sent to custom hook file
  // const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);

  // sent to custom hook file
  // adding a loading state
  // const [isLoading, setIsLoading] = useState(false);

  // sent to custom hook file
  // for error handling
  // const [error, setError] = useState("");

  // const query = "interstellar";
  //const query = "KSDKLFPO";

  // to search for movies based on the user input, lift the state up from Search function to here and pass them as props to the component
  const [query, setQuery] = useState("");
  // const [query, setQuery] = useState("inception");

  // displaying movie details based on selected movie
  const [selectedId, setSelectedId] = useState(null);

  // using the custom hook
  // const{movies, isLoading, error} = useMovies(query, handleCloseSelectedMovie)
  const{movies, isLoading, error} = useMovies(query)

  // moved to useLocalStorageState
  // usestate also accepts a callback function w/c will be used here to ensure the selected watched movies stays in the watch list even after refreshing the page. this type of state is used when the initial state depends on some computation e.g getting data from the local storage. this function is called only on initial render and it must be pure(i.e it musn't accept any argument)
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched")
  //   // since we converted it to string before to store it in the local storage, we need to convert it to the previous for so it can be read by react using json.parse
  //   return JSON.parse(storedValue)
  // });

  const[watched, setWatched] = useLocalStorageState([], "watched")

  function handleSelectedMovie(id) {
    // setSelectedId(id)

    // to close the movie details when another movie is selected. below is updating a state based on the current state
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  // function to add watched movie
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // storing the added watched movie to the local storage. u can also do it using useeffect. json.stringify-to convert the value(in the key-value pair) to a string which is how it is meant to be. watched is the name of the data u want to store, while [...watched, movie] is the actual data u want to store(value) w/c is not a string and needs to be converted to a string with json.stringify
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  // function to delete watched movie
  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // // moved to useLocalStorageState.js
  // // using useEffect to store the movies. this is better than using the first instance cos when you want to delete the movie since the watched state is already synchronised with the local storage you don't need to add another function to delete from the local storage, once it is deleted on the watched list, it is also deleted from the local storage
  // useEffect(function() {
  //   localStorage.setItem("watched", JSON.stringify(watched))
  // }, [watched])

  // instead of passing props deep down to different components b4 it gets to where it will be used(prop drilling), u can use component composition. for e.g, instead of this(<NavBar movies={movies} />) we can make navbar to be reusable then pass in children as props

  // if the dependency array is empty [] then the function will only be called on initial render that is when the app loads for the first time(or the component first mounts)

  // useeffect is used for data fetching in react. to fetch the data as soon as the app loads. effect occurs only after the browser paints

  // moved to the useMovies.js(custom hooks)
  //  useEffect(function() {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data.Search));
  //  }, [])

  // using async await. you cant use async in the callback function in the useeffect, instead it will be used inside another function. then call the function afterward
  // useEffect(
  //   function () {
  //     // the cleanup function to handle http request, such that the request will be fetch when the user is done inputing the movie title. we use abort controller(browser api, has nothing to do with react, just the browser just like fetch). connecting the abort controller with the fetch add the signal
  //     const controller = new AbortController();

  //     async function fetchMovies() {
  //       // setIsLoading(true)
  //       // const res = await fetch(
  //       //   `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  //       // );
  //       // const data = await res.json();
  //       // setMovies(data.Search);
  //       // setIsLoading(false)

  //       // handling errors
  //       try {
  //         setIsLoading(true);
  //         // to remove the error when the user has not searched for the movie
  //         setError("");
  //         // const res = await fetch(
  //         //   `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  //         // );

  //         const res = await fetch(
  //           `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
  //           { signal: controller.signal }
  //         );

  //         // handling error if there is no internet coonection
  //         if (!res.ok)
  //           throw new Error("Something went wrong with fetching movies");

  //         const data = await res.json();
  //         // handling error ehen there is no response or when the movie u are searching 4 is not found
  //         if (data.Response === "False") throw new Error("Movie not found!");

  //         setMovies(data.Search);
  //         setError("");
  //         // setIsLoading(false) to remove the isloading if you can't get the movies move it to finally
  //       } catch (err) {
  //         console.error(err.message);
  //         // setError(err.message);
  //         if (err.name !== "AbortError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }

  //     // add a condition to not display anything if the search bar is empty or has letters < 3
  //     // if (!query.length) {
  //     //   setMovies([])
  //     //   setError("")
  //     //   return;
  //     // }

  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }

  //     // to ensure that when you click on a movie and the details is shown and when u want to search for another movie, the previous movie details closes
  //     handleCloseSelectedMovie();

  //     fetchMovies();

  //     // cleanup function for data fetching
  //     return function () {
  //       controller.abort(); // but this will throw an error as the user searches for movie cos as the user types in another letter, the previous request is aborted which is an error in js which is caught and displayed on the screen, to avoid this- if(err.name !== AbortError) - check above
  //     };
  //   },
  //   [query]
  // );

  // displays only on initial render and is not dependent on anything
  // useEffect(function () {
  //   console.log("on initial render")
  // }, [])

  // displays on every render or when any state is updated
  // useEffect(function () {
  //   console.log("after every render")
  // })
  // updated only when any props or state in the dependency array is updated
  // useEffect(function () {
  //   console.log("d")
  // }, [query])
  return (
    <>
      {/* <NavBar movies={movies} /> */}
      {/* <NavBar movies={movies}>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar> */}

      {/* or */}
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      {/* the same can also be done for <Main/> */}
      {/* also since the listbox and watchedbox has basically the same layout with minor differences, we can just create one reuseable box for the both of them */}
      <Main>
        <Box>
          {/* loading */}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}

          {/* conditional statements to render either the error message, loading or the movie list */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>

      {/* also we can use element as props to explicitly include the elements instead of using children. you can see it often wen u are using react router  */}
      {/* <Main>
        <Box element={<MovieList movies={movies} />}/>
        <Box element={<>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
          </>
        }/>
      </Main> */}
    </>
  );
}

// Main
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// movie list
// function ListBox({ children }) {
//   const [isOpen1, setIsOpen1] = useState(true);
//   return (
//     <div className="box">
//       {/* toggling the button */}
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen1((open) => !open)}
//       >
//         {isOpen1 ? "–" : "+"}
//       </button>
//       {/* {isOpen1 && <MovieList movies={movies} />} */}

//       {isOpen1 && children}
//     </div>
//   );
// }

// function Box({ element }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       {/* toggling the button */}
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {/* {isOpen1 && <MovieList movies={movies} />} */}

//       {isOpen && element}
//     </div>
//   );
// }

// movies watched
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
