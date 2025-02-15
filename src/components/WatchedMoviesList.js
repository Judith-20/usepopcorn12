import React from 'react'

function WatchedMoviesList({ watched, onDelete }) {
    return (
      <ul className="list">
        {watched?.map((movie) => (
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
  
          <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
            X
          </button>
        </div>
      </li>
    );
  }

export default WatchedMoviesList
