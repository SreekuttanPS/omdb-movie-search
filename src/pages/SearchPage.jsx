import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import logo from 'assets/logo.gif';

const baseUrl = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&type=movie&plot=full&s=`;

export default function SearchPage() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([]);

  const searchTextRef = useRef(null);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const { searchText, movieTitle } = useParams();

  const movieListFetch = useCallback(
    (url) => {
      setIsFetchingData(true);

      navigate(`/search/${searchTextRef.current.value}`);
      axios
        .get(url)
        .then((response) => {
          setIsFetchingData(false);
          if (response.data.Response === 'True') {
            setMoviesList(response.data.Search);
          } else {
            toast.error(`Oops! ${response.data.Error}`);
          }
        })
        .catch((error) => {
          setIsFetchingData(false);
          toast.error(`Oops! ${error}`);
        });
    },
    [navigate],
  );

  const searchValidation = () => {
    if (searchTextRef.current.value === '') {
      setErrorMessage('Please enter a search text');
    } else {
      setErrorMessage('');
    }
  };

  const onSearch = useCallback(() => {
    if (searchTextRef.current.value !== '') {
      setMoviesList([]);
      const url = `${baseUrl}${searchTextRef.current.value}`;
      movieListFetch(url);
    }
  }, [movieListFetch]);

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      searchValidation();
      onSearch();
    }
  };

  useEffect(() => {
    if (searchText) {
      searchTextRef.current.value = searchText;
    } else if (movieTitle) {
      searchTextRef.current.value = movieTitle;
    } else {
      searchTextRef.current.value = '';
    }
    if (searchText && isInitialMount.current) {
      onSearch();
    }
    isInitialMount.current = false;
  }, [onSearch, searchText, movieTitle]);

  return (
    <div className="movie-search-body">
      <div className="container movie-search-container text-center">
        <div className="header-part">
          <div className="logo-part">
            <img src={logo} alt="" />
          </div>
          <div className="searchbar">
            <div className="input-section">
              <input
                ref={searchTextRef}
                aria-label="Search contacts"
                placeholder="Please search here..."
                type="search"
                name="search"
                onKeyUp={handleKeyUp}
                onBlur={searchValidation}
              />

              <button
                type="button"
                className="search-button mx-2"
                onMouseUp={searchValidation}
                onClick={onSearch}
              >
                {isFetchingData ? (
                  <span
                    className="spinner-border spinner-border-sm mx-1"
                    role="status"
                  />
                ) : (
                  ''
                )}
                Search
              </button>
            </div>
            {errorMessage ? (
              <span className="error-msg">{errorMessage}</span>
            ) : (
              ''
            )}
          </div>
          <div className="advanced-search">
            <span>Advanced search ▽ </span>
            <div className="adv-search-criteria">
              <div className="mt-2">
                Type :
                {' '}
                <select name="type">
                  <option value="movie" defaultValue>Movies</option>
                  <option value="series">Series</option>
                  <option value="episode">Episodes</option>
                </select>
              </div>
              <div className="mt-2">
                Year :
                {' '}
                <input className="w-50" type="text" name="yearSearch" />
              </div>
              <div className="mt-2">
                View :
                {' '}
                <select name="view">
                  <option value="paginated" defaultValue>Paginated View</option>
                  <option value="infinite">Infinite Scroll</option>
                </select>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={7000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
        <Outlet context={[moviesList, isFetchingData]} />
      </div>
    </div>
  );
}
