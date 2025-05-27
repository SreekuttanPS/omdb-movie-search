import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList } from "redux/slicers/movieSlicer";

import Pagination from "components/Paginate";
import { useEffect, useMemo } from "react";

function PaginationComponent({ className = "" }: { className?: string }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { searchText } = useParams();

  const currentPath = useMemo(() => {
    if (location.pathname?.includes("/series")) {
      return "series";
    } else if (location.pathname?.includes("/episode")) {
      return "episode";
    } else return "movie";
  }, [location.pathname]);

  const totalResults = useAppSelector((state) => state.persistedState.movies.totalResults);
  const totalPages = Math.ceil(Number(totalResults) / 10);

  useEffect(() => {
    if (currentPath || searchParams?.get("page")) {
      dispatch(
        fetchMoviesList({
          type: currentPath,
          page: Number(searchParams?.get("page") || 1),
        })
      );
    }
  }, [dispatch, currentPath, searchParams]);

  const onPaginationClick = (page: number) => {
    dispatch(fetchMoviesList({ page, searchText }));
    setSearchParams({ page: `${page}` });
  };

  return (
    <div className={className}>
      <Pagination
        currentPage={Number(searchParams?.get("page") || 1)}
        totalPages={totalPages}
        onPageChange={onPaginationClick}
      />
    </div>
  );
}

export default PaginationComponent;
