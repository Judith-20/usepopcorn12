import { useEffect, useState } from "react";

// key is used here to enable the user use any key of their choice instead of using "watched"
export function useLocalStorageState(initialState, key) {
  // usestate also accepts a callback function w/c will be used here to ensure the selected watched movies stays in the watch list even after refreshing the page. this type of state is used when the initial state depends on some computation e.g getting data from the local storage. this function is called only on initial render and it must be pure(i.e it musn't accept any argument)
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    // since we converted it to string before to store it in the local storage, we need to convert it to the previous for so it can be read by react using json.parse
    // return JSON.parse(storedValue);
    // if there is no storedValue, it should return the empty array instead of throwing error
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // using useEffect to store the movies. this is better than using the first instance cos when you want to delete the movie since the watched state is already synchronised with the local storage you don't need to add another function to delete from the local storage, once it is deleted on the watched list, it is also deleted from the local storage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
