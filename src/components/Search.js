import React, { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  //  how not to select DOM elements in react. here to make the input field to be on focus on initial render
  // useEffect(() => {
  //   const el = document.querySelector(".search")
  //   console.log(el)
  //   el.focus()
  // }, [])

  // implementing the useRef to select DOM elements. since we're selecting a input element, the initial value will be null
  const inputEl = useRef(null);

  // to ensure the input field is in focus on initial render
  useEffect(
    function () {
      function callback(e) {
        // to not reset the field when u are searching for a movie and you press enter
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      // focusing on the input field on initial render
      inputEl.current.focus();
      // focusing on the input field when enter key is pressed
      document.addEventListener("keydown", callback);

      // cleanup
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

// useRef is used to create a variable that stays the same accross multiple renders(e.g storng the previous state or setTimeout id). most importantly, it is used in selecting and storing DOM elements

export default Search;
