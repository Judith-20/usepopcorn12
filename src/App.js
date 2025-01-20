import { useEffect, useState } from "react";
import StarRating from "./StarRating";

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

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "36968d25";

export default function App() {
  // const [movies, setMovies] = useState(tempMovieData);
  // const [watched, setWatched] = useState(tempWatchedData);

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  // adding a loading state
  const [isLoading, setIsLoading] = useState(false);

  // for error handling
  const [error, setError] = useState("");

  // const query = "interstellar";
  //const query = "KSDKLFPO";

  // to search for movies based on the user input, lift the state up from Search function to here and pass them as props to the component
  // const [query, setQuery] = useState("");
  const [query, setQuery] = useState("inception");

  // displaying movie details based on selected movie
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedMovie(id) {
    // setSelectedId(id)

    // to close the movie details when another movie is selected
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  // function to add watched movie
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  // function to delete watched movie
  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // instead of passing props deep down to different components b4 it gets to where it will be used(prop drilling), u can use component composition. for e.g, instead of this(<NavBar movies={movies} />) we can make navbar to be reusable then pass in children as props

  // if the dependency array is empty [] then the function will only be called on initial render that is when the app loads for the first time(or the component first mounts)

  // useeffect is used for data fetching in react. to fetch the data as soon as the app loads. effect occurs only after the browser paints
  //  useEffect(function() {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data.Search));
  //  }, [])

  // using async await. you cant use async in the callback function in the useeffect, instead it will be used inside another function. then call the function afterward
  useEffect(
    function () {
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
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          // handling error if there is no internet coonection
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          // handling error ehen there is no response or when the movie u are searching 4 is not found
          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          // setIsLoading(false) to remove the isloading if you can't get the movies move it to finally
        } catch (err) {
          console.error(err.message);
          setError(err.message);
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

      fetchMovies();
    },
    [query]
  );

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
              <WatchedMoviesList watched={watched} onDelete={handleDeleteWatchedMovie} />
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

// Nav bar
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
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

// creating one reusable box for listbox and watchedbox
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      {/* toggling the button */}
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {/* {isOpen1 && <MovieList movies={movies} />} */}

      {isOpen && children}
    </div>
  );
}

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

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

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

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});

  // adding the loading state
  const [isLoading, setIsLoading] = useState(false);

  // update the rating selected
  const [userRating, setUserRating] = useState("");

  // destructuring the data(object) gotten to change it to small letters instead of the initial capitalized form
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // console.log(title, released)

  // to display the stars and add to list button if the user hasn't selected the movie previously. for this we need the watched array
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  // console.log(isWatched);

  // to display the number of rating given
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    // closes the movie details when u click on the add list button
    onCloseMovie();
  }

  useEffect(
    function () {
      // to display the selected movie details, u need to fetch the api with a different search query(i), that conatins all the details u need to be displayed

      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
      // to ensure that when u select another movie, the details will be diplayed, add the selected id into the dependency array so wen it changes, the useeffect hook will be re-rendered with the current selected id
    },
    [selectedId]
  );

  // updating the movie title as soon as another movie is selected
  // useEffect(function() {
  //   // handling when the movie has not been gotten
  //   if(!title) return
  //   document.title = `Movie | ${title}`
  // }, [title])

  // cleanup function is the function dat we can RETURN from an effect. it runs b4 d effect is executed again and after a component has unmounted. it is necessary whenever the side effects keeps happening after the component has been re-rendered or unmounted e.g a http request that was made needs to be cancelled b4 anoda is been made to avoid bugs(race condition). it also runs after the re-render

  useEffect(function() {
    // handling when the movie has not been gotten
    if(!title) return
    document.title = `Movie | ${title}`

    // cleanup function
    return function() {
      document.title = "usePopcorn"
    }
  }, [title])

  return (
    <div className="details">
      {/* adding the loader */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {/* displays the add to list button only when the user rates the movie */}
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie with {watchedUserRating}⭐ </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {/* {selectedId} */}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}
