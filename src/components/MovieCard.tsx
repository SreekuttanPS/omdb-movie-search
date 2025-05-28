import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { addToFav, removeFromFav } from "redux/slicers/favouriteSlicer";

import { MovieType } from "helpers/sharedTypes";

import FavouriteIcon from "assets/svg/FavouriteIcon";
import LogoIcon from "assets/svg/LogoIcon";
import NotFavouriteIcon from "assets/svg/NotFavouriteIcon";

function MovieCard({ movie }: { movie: MovieType }) {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(
    (state) => state.persistedState?.favourites?.present?.favourites
  );

  return (
    <div>
      <div className="my-9 justify-center items-center md:justify-start md:items-start flex flex-col md:flex-row gap-3">
        <Link to={`/info/${movie?.imdbID}`} className="hover:scale-110 ease-in-out duration-300">
          {!movie?.Poster || movie?.Poster === "N/A" ? (
            <div className="w-40 h-24 object-cover rounded overflow-hidden bg-black flex items-center justify-center">
              <LogoIcon />
            </div>
          ) : (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-40 h-24 object-cover rounded overflow-hidden"
              loading="lazy"
            />
          )}
        </Link>
        <div className="flex flex-col items-center md:items-start">
          <Link to={`/info/${movie?.imdbID}`}>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-bold flex flex-col md:flex-row items-center">
                {movie.Title}
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded ml-2">
                  {movie.Type?.toUpperCase()}
                </span>
              </h3>
              <p className="text-sm text-gray-300">{movie.Year}</p>
            </div>
          </Link>
          <button
            className="mt-4 cursor-pointer hover:scale-120 ease-in-out duration-300"
            onClick={() => {
              if (favourites?.[movie.imdbID]) {
                dispatch(removeFromFav(movie));
              } else {
                dispatch(addToFav(movie));
              }
            }}
          >
            {favourites?.[movie.imdbID] ? (
              <FavouriteIcon className="motion-safe:animate-bounce" width={25} />
            ) : (
              <NotFavouriteIcon width={25} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
