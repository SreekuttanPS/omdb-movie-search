import LogoIcon from "assets/svg/LogoIcon";
import LoginPopup from "components/LoginPopup";
import { FavMovieType } from "helpers/sharedTypes";
import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { addToFav, removeFromFav } from "redux/slicers/favouriteSlicer";

const movies = [
  {
    title: "INTERSTELLAR",
    image: "/interstellar.jpg",
    alt: "Interstellar",
    description:
      "A team of intergalactic explorers must pass through a wormhole and be trapped in a space-time dimension...",
    genre: "SCI-FI",
  },
  {
    title: "DIVERGENT",
    image: "/divergent.jpg",
    alt: "Divergent",
    description:
      "In a world divided into factions based on kindness, Tris realized she was divergent and wouldn't fit anywhere...",
    genre: "SCI-FI",
  },
  {
    title: "DUNE",
    image: "/dune.jpg",
    alt: "Dune",
    description:
      "A mythical and emotional hero's journey, Dune tells the story of Paul Atreides...",
    genre: "SCI-FI",
  },
  {
    title: "GRAVITY",
    image: "/gravity.jpg",
    alt: "Gravity",
    description:
      "Engineer Dr. Ryan Stone on his first mission to space. Unexpectedly, he and astronaut Matt Kowalski...",
    genre: "SCI-FI",
  },
];

const MoviesList: React.FC = () => {
  const navigate = useNavigate();
  const movies = useAppSelector((state) => state.persistedState.movies);
  const favouritesList = useAppSelector((state) => state.persistedState.favourites.present);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const currentPath: string = useOutletContext();

  console.log('currentPath: ', currentPath);

  const addToFavhandle = (item: FavMovieType) => {
    if (movies.isLoggedIn) {
      dispatch(addToFav(item));
    } else {
      setIsModalOpen(true);
    }
  };

  const removeFromFavHandle = (imdbID: string) => {
    if (movies.isLoggedIn) {
      dispatch(removeFromFav(imdbID));
    } else {
      setIsModalOpen(true);
    }
  };

  console.log("movies: ", movies);

  const loginModalHandle = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center bg-blue-600 bg-[url(src/assets/images/list-bg-image.webp)] bg-blend-multiply">
      <section className=" mx-8 px-6 py-6 bg-red-600/35">
      {/* <section className=" mx-8 px-6 py-6 bg-[#450607]/50"> */}
        <div className="text-sm text-gray-400 mb-2">{(currentPath || 'movies')?.toUpperCase()} | Designed by Sreekuttan</div>
        <div className="space-y-6">
          {movies?.moviesList?.map((movie) => (
            <Link to={`/${movie?.imdbID}/${movie.Title}/details`} key={movie?.imdbID}>
              <div className="my-9 justify-center items-center md:justify-start md:items-start flex flex-col md:flex-row gap-3">
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
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="text-lg font-bold flex flex-col md:flex-row items-center">
                    {movie.Title}
                    <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded ml-2">
                      {movie.Type?.toUpperCase()}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-300">{movie.Year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* <LoginPopup open onCancel={() => {}} /> */}
    </div>
  );
};

export default MoviesList;
