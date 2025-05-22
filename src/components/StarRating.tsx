import React from 'react';
import { generateRandomString } from 'helpers/utils';

interface StarProps {
  fullStarColor: string;
  emptyStarColor: string;
  starFillPercentage: string | number;
  starBorderColor: string;
  starBorderWidth: number | string;
  id: string;
}

const Star: React.FC<StarProps> = ({
  fullStarColor,
  emptyStarColor,
  starFillPercentage,
  starBorderColor,
  starBorderWidth,
  id,
}) => (
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

interface StarRatingProps {
  rating: number | string;
  emptyStarColor: string;
  fullStarColor: string;
  starBorderWidth: number | string;
  starBorderColor: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  emptyStarColor,
  fullStarColor,
  starBorderWidth,
  starBorderColor,
}) => {
  const svgRating = Number(rating) / 2;
  const finalStarCount = Math.floor(svgRating);
  const halfStarPercentage = (svgRating % 1).toFixed(2).substring(2);

  const starArray = ['0', '0', '0', '0', '0'];
  starArray.fill('100', 0, finalStarCount);
  if (finalStarCount < 5 && Number(halfStarPercentage) > 0) {
    starArray.fill(halfStarPercentage, finalStarCount, finalStarCount + 1);
  }

  return (
    <>
      {starArray.map((value, idx) => (
        <Star
          key={generateRandomString()}
          fullStarColor={fullStarColor}
          starFillPercentage={value}
          emptyStarColor={emptyStarColor}
          id={`${value}-${idx}-${generateRandomString()}`}
          starBorderColor={starBorderColor}
          starBorderWidth={starBorderWidth}
        />
      ))}
    </>
  );
};

export default StarRating;
