import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import LoadingIcon from "assets/svg/LoadingIcon";

import Categories from "components/Categories";
import PaginationComponent from "components/PaginationComponent";
import InfiniteScrollToggle from "components/InfiniteScrollToggle";
import MovieCard from "components/MovieCard";
import SearchBar from "components/SearchBar";

import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList, setCurerntPage } from "redux/slicers/movieSlicer";
import { isEmpty } from "helpers/utils";

const MoviesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isFavouritesPage = location?.pathname?.includes("/favourites");

  const moviesList = useAppSelector((state) => state.persistedState?.movies?.moviesList);
  const currentPage = useAppSelector((state) => state.persistedState?.movies?.currentPage);
  const searchText = useAppSelector((state) => state.persistedState?.movies?.searchText);
  const isInfiniteScroll = useAppSelector(
    (state) => state.persistedState?.movies?.pageView === "infinite_sroll"
  );
  const favourites = useAppSelector(
    (state) => state.persistedState?.favourites?.present?.favourites
  );
  const isLoading = useAppSelector((state) => state.persistedState?.movies?.isLoading || false);
  const totalResults = useAppSelector((state) => state.persistedState?.movies?.totalResults);

  const scrollRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchNextPage = (infiniteScroll: boolean, totalResults: number) => {
      if (infiniteScroll && currentPage < (Math.ceil(totalResults / 10))) {
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

  return (
    <>
      <Categories />
      <div className="flex items-center justify-center bg-blue-600 bg-[url(/images/list-bg-image.webp)] bg-blend-multiply">
        <section className=" mx-8 px-6 py-6 bg-red-600/35 md:min-w-[85vw]" ref={scrollRef}>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div className="text-sm text-gray-400 mb-2">Movie Hunter | Designed by Sreekuttan</div>
            {!isFavouritesPage && (
              <>
                <SearchBar />
                <InfiniteScrollToggle isInfiniteScroll={isInfiniteScroll} />
              </>
            )}
          </div>
          {isLoading && !isInfiniteScroll ? (
            <div className="flex items-center justify-center h-[15vh] md:h-[45vh]">
              <LoadingIcon className="animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 divide-y divide-black">
              {isFavouritesPage
                ? Object.values(favourites || {}).map((favouriteMovie) => (
                    <MovieCard movie={favouriteMovie} key={favouriteMovie?.imdbID} />
                  ))
                : moviesList?.map((movie) => <MovieCard movie={movie} key={movie?.imdbID} />)}
            </div>
          )}
          {isFavouritesPage && isEmpty(favourites) ? (
            <div className="flex items-center justify-center h-[15vh] md:h-[45vh]">
              <div className="text-gray-400">No favourites found!</div>
            </div>
          ) : null}
          {!isFavouritesPage && isEmpty(moviesList) && !isLoading ? (
            <div className="flex items-center justify-center h-[15vh] md:h-[45vh]">
              <div className="text-gray-400">No movies found!</div>
            </div>
          ) : null}
          {isLoading ? (
            <div className="flex items-center justify-center h-[15vh] md:h-[45vh]">
              <LoadingIcon className="animate-spin" />
            </div>
          ) : null}
          {/* Show pagination only if not in infinite scroll mode */}
          {!isInfiniteScroll && !isLoading && !isFavouritesPage && !isEmpty(moviesList) ? (
            <PaginationComponent className="flex justify-center" />
          ) : null}
        </section>
        {/* <LoginPopup open onCancel={() => {}} /> */}
      </div>
    </>
  );
};

export default MoviesList;
