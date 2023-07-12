import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { fetchMoviesList } from 'redux/slicers/movieSlicer';
import { useParams } from 'react-router-dom';

function PaginationComponent() {
  const totalResults = useSelector((state) => state.movies.totalResults);
  const totalPages = Math.ceil((Number(totalResults)) / 10);
  const pagesArray = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pagesArray.push(i);
  }

  const dispatch = useDispatch();
  const { searchText } = useParams();

  const onPaginationClick = (e) => {
    dispatch(fetchMoviesList(`&s=${searchText}&page=${e.selected + 1}`));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPaginationClick}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      activeClassName="paginate-active"
      previousClassName="paginate-previous"
      nextClassName="paginate-next"
    />

  );
}

export default PaginationComponent;
