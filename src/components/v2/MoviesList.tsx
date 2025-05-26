import LogoIcon from "assets/svg/LogoIcon";
import LoginPopup from "components/LoginPopup";
import PaginationComponent from "components/PaginationComponent";
import Categories from "components/v2/Categories";
import { Categories as CategoryType, FavMovieType } from "helpers/sharedTypes";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { addToFav, removeFromFav } from "redux/slicers/favouriteSlicer";
import { fetchMoviesList, setSelectedCategory } from "redux/slicers/movieSlicer";

const MoviesList: React.FC = () => {
  const moviesList = useAppSelector((state) => state.persistedState?.movies?.moviesList);

  const selectedCategory = useAppSelector(
    (state) => state?.persistedState?.movies?.selectedCategory
  );

  const isLoggedIn = useAppSelector((state) => state.persistedState?.movies?.login?.isLoggedIn);

  const favouritesList = useAppSelector((state) => state.persistedState.favourites.present);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const currentPath: CategoryType = useOutletContext();

  console.log("currentPath: ", currentPath);

  const addToFavhandle = (item: FavMovieType) => {
    if (isLoggedIn) {
      dispatch(addToFav(item));
    } else {
      setIsModalOpen(true);
    }
  };

  const removeFromFavHandle = (imdbID: string) => {
    if (isLoggedIn) {
      dispatch(removeFromFav(imdbID));
    } else {
      setIsModalOpen(true);
    }
  };

  const loginModalHandle = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("selectedCategory: ", selectedCategory);
    console.log("currentPath: ", currentPath);
    if (currentPath !== selectedCategory) {
      console.log("hitt");
      dispatch(setSelectedCategory(currentPath));
      dispatch(fetchMoviesList({ type: currentPath }));
    }
  }, [currentPath, selectedCategory, dispatch]);

  return (
    <>
      <Categories currentPath={currentPath} />
      <div className="flex items-center justify-center bg-blue-600 bg-[url(src/assets/images/list-bg-image.webp)] bg-blend-multiply">
        <section className=" mx-8 px-6 py-6 bg-red-600/35 md:min-w-[85vw]">
          <div className="text-sm text-gray-400 mb-2">
            {(currentPath || "movies")?.toUpperCase()} | Designed by Sreekuttan
          </div>
          <div className="space-y-6 divide-y divide-black">
            {moviesList?.map((movie) => (
              <div key={movie?.imdbID}>
                <Link to={`/info/${movie?.imdbID}`}>
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
              </div>
            ))}
          </div>
          <PaginationComponent className="flex justify-center" />
        </section>
        {/* <LoginPopup open onCancel={() => {}} /> */}
      </div>
    </>
  );
};

export default MoviesList;
