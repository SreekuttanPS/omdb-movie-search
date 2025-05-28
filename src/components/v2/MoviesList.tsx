import LogoIcon from "assets/svg/LogoIcon";
// import LoginPopup from "components/LoginPopup";
import PaginationComponent from "components/PaginationComponent";
import Categories from "components/v2/Categories";
import { useDebounce } from "hooks/useDebounce";
// import { FavMovieType } from "helpers/sharedTypes";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList, setCurerntPage, setSearchText } from "redux/slicers/movieSlicer";
import InfiniteScrollToggle from "./InfiniteScrollToggle";
import LoadingIcon from "assets/svg/LoadingIcon";
// import { addToFav, removeFromFav } from "redux/slicers/favouriteSlicer";

const MoviesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const moviesList = useAppSelector((state) => state.persistedState?.movies?.moviesList);
  const currentPage = useAppSelector((state) => state.persistedState?.movies?.currentPage);
  const searchText = useAppSelector((state) => state.persistedState?.movies?.searchText);
  const isInfiniteScroll = useAppSelector(
    (state) => state.persistedState?.movies?.pageView === "infinite_sroll"
  );
  const isLoading = useAppSelector((state) => state.persistedState?.movies?.isLoading || false);
  const totalResults = useAppSelector((state) => state.persistedState?.movies?.totalResults);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  // const isLoggedIn = useAppSelector((state) => state.persistedState?.movies?.login?.isLoggedIn);

  // const favouritesList = useAppSelector((state) => state.persistedState.favourites.present);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useAppDispatch();

  // const addToFavhandle = (item: FavMovieType) => {
  //   if (isLoggedIn) {
  //     dispatch(addToFav(item));
  //   } else {
  //     setIsModalOpen(true);
  //   }
  // };

  // const removeFromFavHandle = (imdbID: string) => {
  //   if (isLoggedIn) {
  //     dispatch(removeFromFav(imdbID));
  //   } else {
  //     setIsModalOpen(true);
  //   }
  // };

  // const loginModalHandle = () => {
  //   setIsModalOpen(false);
  // };

  useEffect(() => {
    const fetchNextPage = (infiniteScroll: boolean, totalResults: number) => {
      if (infiniteScroll && currentPage < totalResults) {
        dispatch(fetchMoviesList({ page: currentPage + 1, searchText }));
        dispatch(setCurerntPage(currentPage + 1));
      }
    };

    const handleScroll = () => {
      if (scrollRef?.current) {
        const scrollHeight = scrollRef.current.scrollHeight;
        if (window.scrollY >= scrollHeight - window.innerHeight) {
          fetchNextPage(isInfiniteScroll, totalResults);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchText, currentPage, dispatch, isInfiniteScroll, totalResults]);

  const handleInput = (val: string) => {
    dispatch(setSearchText(val));
  };

  const debouncedFetch = useDebounce((val: string) => {
    dispatch(fetchMoviesList({ page: 1, searchText: val.trim() }));
  }, 300);

  return (
    <>
      <Categories />
      <div className="flex items-center justify-center bg-blue-600 bg-[url(src/assets/images/list-bg-image.webp)] bg-blend-multiply">
        <section className=" mx-8 px-6 py-6 bg-red-600/35 md:min-w-[85vw]">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="text-sm text-gray-400 mb-2">Movie Hunter | Designed by Sreekuttan</div>
            <input
              type="text"
              value={searchText}
              placeholder="Search..."
              onChange={(e) => {
                handleInput(e.target.value);
                debouncedFetch(e.target.value);
              }}
              className="w-full md:w-[30%] border border-red-300 px-3 py-2 rounded-xl hover:scale-105 focus:scale-105 ease-in-out duration-600 focus:outline-none focus:border-red-700 text-center"
            />
            <InfiniteScrollToggle isInfiniteScroll={isInfiniteScroll} />
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center h-[15vh] md:h-[45vh]" ref={scrollRef}>
              <LoadingIcon className="animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 divide-y divide-black" ref={scrollRef}>
              {moviesList?.map((movie) => (
                <div key={movie?.imdbID}>
                  <div className="my-9 justify-center items-center md:justify-start md:items-start flex flex-col md:flex-row gap-3">
                    <Link
                      to={`/info/${movie?.imdbID}`}
                      className="hover:scale-110 ease-in-out duration-300"
                    >
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
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isInfiniteScroll && !isLoading? <PaginationComponent className="flex justify-center" /> : null}
        </section>
        {/* <LoginPopup open onCancel={() => {}} /> */}
      </div>
    </>
  );
};

export default MoviesList;
