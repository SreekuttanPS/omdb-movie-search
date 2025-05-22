// import { useParams } from 'react-router-dom';

// import { fetchMoviesList } from 'redux/slicers/movieSlicer';
// import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';

function PaginationComponent() {
  // const totalResults = useAppSelector((state) => state.persistedState.movies.totalResults);
  // const totalPages = Math.ceil((Number(totalResults)) / 10);
  // const pagesArray = [];

  // for (let i = 1; i <= totalPages; i += 1) {
  //   pagesArray.push(i);
  // }

  // const dispatch = useAppDispatch();
  // const { searchText } = useParams();

  // const onPaginationClick = (e) => {
  //   dispatch(fetchMoviesList(`&s=${searchText}&page=${e.selected + 1}`));
  // };

  return (
    // <ReactPaginate
    //   breakLabel="..."
    //   nextLabel=">"
    //   onPageChange={onPaginationClick}
    //   pageRangeDisplayed={3}
    //   pageCount={totalPages}
    //   previousLabel="<"
    //   renderOnZeroPageCount={null}
    //   activeClassName="paginate-active"
    //   previousClassName="paginate-previous"
    //   nextClassName="paginate-next"
    // />
    null

  );
}

export default PaginationComponent;
