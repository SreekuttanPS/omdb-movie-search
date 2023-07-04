import React from 'react';
import PropTypes from 'prop-types';
import { generateRandomString } from 'helpers/utils';

function Star({
  fullStarColor,
  emptyStarColor,
  starFillPercentage,
  starBorderColor,
  starBorderWidth,
  id,
}) {
  return (
    <svg height="30" width="35" viewBox="0 0 200 300">
      <defs>
        <linearGradient id={id}>
          <stop offset="0%" stopColor={fullStarColor} />
          <stop offset={`${starFillPercentage}%`} stopColor={fullStarColor} />
          <stop offset={`${starFillPercentage}%`} stopColor={emptyStarColor} />
          <stop offset="100%" stopColor={emptyStarColor} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke={starBorderColor} strokeWidth={starBorderWidth}>
        <polygon points="100,10 40,198 190,78 10,78 160,198" />
        <polygon points="100,10 40,198 190,78 10,78 160,198" stroke="none" />
      </g>
    </svg>
  );
}

function StarRating({
  rating,
  emptyStarColor,
  fullStarColor,
  starBorderWidth,
  starBorderColor,
}) {
  const svgRating = Number(rating) / 2;
  const finalStarCount = Math.floor(svgRating);
  const halfStarPercentage = (svgRating % 1).toFixed(2).substring(2);

  const starArray = ['0', '0', '0', '0', '0'];
  starArray.fill('100', 0, finalStarCount);
  if (finalStarCount < 5 && halfStarPercentage > 0) {
    starArray.fill(halfStarPercentage, finalStarCount, finalStarCount + 1);
  }

  return (
    starArray.map((value) => (
      <Star
        key={generateRandomString()}
        fullStarColor={fullStarColor}
        starFillPercentage={value}
        emptyStarColor={emptyStarColor}
        id={value}
        starBorderColor={starBorderColor}
        starBorderWidth={starBorderWidth}
      />
    ))
  );
}
StarRating.propTypes = {
  rating: PropTypes.string.isRequired,
  starBorderWidth: PropTypes.number.isRequired,
  starBorderColor: PropTypes.string.isRequired,
  emptyStarColor: PropTypes.string.isRequired,
  fullStarColor: PropTypes.string.isRequired,
};

Star.propTypes = {
  starBorderWidth: PropTypes.number.isRequired,
  starFillPercentage: PropTypes.string.isRequired,
  starBorderColor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  emptyStarColor: PropTypes.string.isRequired,
  fullStarColor: PropTypes.string.isRequired,
};

export default StarRating;
