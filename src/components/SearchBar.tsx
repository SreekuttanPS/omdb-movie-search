import { useDebounce } from "hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";
import { fetchMoviesList, setSearchText } from "redux/slicers/movieSlicer";

function SearchBar() {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.persistedState?.movies?.searchText);

  const handleInput = (val: string) => {
    dispatch(setSearchText(val));
  };

  const debouncedFetch = useDebounce((val: string) => {
    dispatch(fetchMoviesList({ page: 1, searchText: val.trim() }));
  }, 300);

  return (
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
  );
}

export default SearchBar;
