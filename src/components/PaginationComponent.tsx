import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList } from "redux/slicers/movieSlicer";

import Pagination from "components/Paginate";
import { useState } from "react";

function PaginationComponent({ className = "" }: { className?: string }) {
  const totalResults = useAppSelector((state) => state.persistedState.movies.totalResults);
  const totalPages = Math.ceil(Number(totalResults) / 10);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const { searchText } = useParams();

  const onPaginationClick = (page: number) => {
    dispatch(fetchMoviesList({ page, searchText }));
    setCurrentPage(page);
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
