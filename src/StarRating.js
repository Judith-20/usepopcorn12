// export default function StarRating({maxRating}) {
// to allow users specify the amount of stars they want here we pass it as props(maxRating)
// to prevent error or empty values if the user doesn't select any amount of stars, give it a default value

import { useState } from "react";
// for props valdation
import PropTypes from "prop-types"

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
}

// export default function StarRating({ maxRating = 5 }) {

// making props to be a public API that can be useful for different people, include different props and default values, so it can be used in different ways with differentstyles
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className="",
  messages=[],
  // handling the defaultRating
  defaultRating = 0,
  onSetRating,
}) {
  // handle the rating
  //  const [rating, setRating] = useState(1)
  // const [rating, setRating] = useState(0);
  const [rating, setRating] = useState(defaultRating);

  // handle the temporary rating when you hover on the stars
  const [tempRating, setTempRating] = useState(0);
  

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating)
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size/2}px`
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {
          // Array.from({length: 5}, (_, i) => (
          Array.from({ length: maxRating }, (_, i) => (
            // <span>S{i + 1} </span>
            // <Star key={i} onRate={() => setRating(i + 1)}

            <Star
              key={i}
              // for the rating
              onRate={() => handleRating(i + 1)}
              // for the temporary rating when you hover on the stars
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              // full={rating >= i + 1}
              // to toggle btw full and empty stars
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              color={color}
              size={size}
            />
          ))
        }
      </div>
      {/* <p style={textStyle}>{rating || ""}</p> */}
      {/* <p style={textStyle}>{tempRating || rating || ""}</p> */}

        {/* if the messages length is shorter than the stars then it uses the default numbers. rating - 1 cos index starts from 0 */}
      {/* <p style={textStyle}>{messages.length === maxRating ? messages[rating - 1] : tempRating || rating || ""}</p> */}

      <p style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ""}</p>
    </div>
  );
}


// creating the star
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          // fill="#000"
          // stroke="#000"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          // stroke="#000"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
