import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList } from "redux/slicers/movieSlicer";

import Pagination from "components/Paginate";
import { useState } from "react";

function PaginationComponent() {
  const totalResults = useAppSelector((state) => state.persistedState.movies.totalResults);
  const totalPages = Math.ceil(Number(totalResults) / 10);
  const pagesArray = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= totalPages; i += 1) {
    pagesArray.push(i);
  }

  const dispatch = useAppDispatch();
  const { searchText } = useParams();

  const onPaginationClick = (page: number) => {
    dispatch(fetchMoviesList(`&s=${searchText}&page=${page}`));
    setCurrentPage(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageRangeDisplayed={3}
      onPageChange={onPaginationClick}
    />
  );
}

export default PaginationComponent;
