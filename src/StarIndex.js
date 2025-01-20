import React, { useState } from "react";
import StarRating from "./StarRating";

// to get access to the state in the other file and use it here
function Test() {
  // set a new state
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

<>
  <StarRating
    maxRating={5}
    messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
  />
  {/* <StarRating maxRating={10} />*/}
  <StarRating color="red" size={24} className="test" defaultRating={3} />
  <Test />
</>;
