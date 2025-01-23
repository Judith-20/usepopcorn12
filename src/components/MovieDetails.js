import React, { useEffect, useRef, useState } from 'react'
import Loader from './Loader';
import StarRating from '../StarRating'

const KEY = "36968d25";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});

  // adding the loading state
  const [isLoading, setIsLoading] = useState(false);

  // update the rating selected
  const [userRating, setUserRating] = useState("");

  // using refs to persists data btw renders. useRefs is used when updating data based on the the current one without re-rendering the component
  const countRef = useRef(0)

  useEffect(function() {
    // to know the number of times the user selects rating befor finally adding it to the list
    if (userRating) countRef.current++
  }, [userRating])

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
  const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedId);
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
      countRatingDecisions:countRef.current
    };

    onAddWatched(newWatchedMovie);
    // closes the movie details when u click on the add list button
    onCloseMovie();
  }

  // moved to useKey.js
  // listening to a keypress
  // useEffect(
  //  function () {
  //   function callback(e) {
  //     if (e.code === 'Escape') {
  //       onCloseMovie()
  //     }
  //   }
  //   document.addEventListener('keydown', callback)

  //   // cleanup function to remove the event listener when the component unmounts or re-renders
  //   return function() {
  //     document.removeEventListener('keydown', callback)
  //   }
  //  }, [onCloseMovie]
  // )

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

  useEffect(
    function () {
      // handling when the movie has not been gotten
      if (!title) return;
      document.title = `Movie | ${title}`;

      // cleanup function - for movie title
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

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

export default MovieDetails
