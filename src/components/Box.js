import React, { useState } from 'react'

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

export default Box
