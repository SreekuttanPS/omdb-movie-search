import PropTypes from "prop-types";

const SvgStar = ({
  keyValue,
  fillerColor,
  bgColour,
  filler,
  strokeColor,
  stroke,
  id,
}) => {
  // if (isNaN(filler)) {
  //   filler = 0;
  // }
  return (
    <svg height="30" width="35" viewBox="0 0 200 300" key={keyValue}>
      <defs>
        <linearGradient id={id}>
          <stop offset="0%" stopColor={fillerColor} />
          <stop offset={`${filler}%`} stopColor={fillerColor} />
          <stop offset={`${filler}%`} stopColor={bgColour} />
          <stop offset="100%" stopColor={bgColour} />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke={strokeColor} strokeWidth={stroke}>
        <polygon points="100,10 40,198 190,78 10,78 160,198" />
        <polygon points="100,10 40,198 190,78 10,78 160,198" stroke="none" />
      </g>
    </svg>
  );
};

const StarRating = ({ rating, bgColour, fillerColor, stroke, strokeColor }) => {
  let svgRating = Number(rating) / 2;
  let finalStarCount = Math.floor(svgRating);
  let filler = (svgRating % 1).toFixed(2).substring(2);

  let i = 0;
  const starArray = [];

  for (i; i < 5; i++) {
    if (filler > 0 && i == finalStarCount) {
      starArray.push(
        <SvgStar
          key={i}
          fillerColor={fillerColor}
          filler={filler}
          bgColour={bgColour}
          id="halfstar"
          strokeColor={strokeColor}
          stroke={stroke}
        />
      );
    } else if (i >= finalStarCount) {
      starArray.push(
        <SvgStar
          key={i}
          fillerColor={bgColour}
          filler={filler}
          bgColour={bgColour}
          id="emptystar"
          strokeColor={strokeColor}
          stroke={stroke}
        />
      );
    } else {
      starArray.push(
        <SvgStar
          key={i}
          fillerColor={fillerColor}
          filler={filler}
          bgColour={fillerColor}
          id="fullstar"
          strokeColor={strokeColor}
          stroke={stroke}
        />
      );
    }
  }

  return starArray;
};
StarRating.propTypes = {
  rating: PropTypes.string,
  stroke: PropTypes.number,
  strokeColor: PropTypes.string,
  bgColour: PropTypes.string,
  fillerColor: PropTypes.string,
};

SvgStar.propTypes = {
  rating: PropTypes.string,
  stroke: PropTypes.number,
  filler: PropTypes.string,
  keyValue: PropTypes.number,
  strokeColor: PropTypes.string,
  id: PropTypes.string,
  bgColour: PropTypes.string,
  fillerColor: PropTypes.string,
};

export default StarRating;
