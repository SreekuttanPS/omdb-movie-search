import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList, setCurerntPage } from "redux/slicers/movieSlicer";

import Pagination from "components/Paginate";
function PaginationComponent({ className = "" }: { className?: string }) {
  const currentPage = useAppSelector((state) => state.persistedState.movies.currentPage);
  const searchText = useAppSelector((state) => state.persistedState.movies.searchText);
  const dispatch = useAppDispatch();


  const totalResults = useAppSelector((state) => state.persistedState.movies.totalResults);
  const totalPages = Math.ceil(Number(totalResults) / 10);

  const onPaginationClick = (page: number) => {
    dispatch(fetchMoviesList({ page, searchText }));
    dispatch(setCurerntPage(page));
  };

  return (
    <div className={className}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPaginationClick}
      />
    </div>
  );
}

export default PaginationComponent;
