import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  UncontrolledAccordion, AccordionHeader, AccordionItem, AccordionBody,
} from 'reactstrap';

import logo from 'assets/logo.gif';

const baseUrl = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&plot=full`; // &type=movie&s=

export default function SearchPage() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState([]);

  const searchTextRef = useRef(null);
  const searchYearRef = useRef(null);
  const searchTypeRef = useRef(null);
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
            setApiResponse(response.data.Search);
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
    } else if (searchYearRef.current.value !== '') {
      if (!searchYearRef.current.validity.valid) {
        setErrorMessage('Please enter a valid year');
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('');
    }
  };

  const onSearch = useCallback(() => {
    let url;
    // console.log('errorMessage: ', errorMessage);

    if (searchTextRef.current.value !== '' && searchYearRef.current.validity.valid) {
      console.log('hit: ');

      setApiResponse([]);
      if (searchYearRef.current.value !== '') {
        url = `${baseUrl}&s=${searchTextRef.current.value}&type=${searchTypeRef.current.value}&y=${searchYearRef.current.value}`;
      } else {
        url = `${baseUrl}&s=${searchTextRef.current.value}&type=${searchTypeRef.current.value}`;
      }
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
                autoComplete="off"
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
            <UncontrolledAccordion stayOpen>
              <AccordionItem>
                <AccordionHeader targetId="1">
                  Advanced search ▽
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <div className="adv-search-criteria">
                    <div className="mt-2 advanced-select">
                      Type :
                      {' '}
                      <select name="searchType" ref={searchTypeRef}>
                        <option value="movie" defaultValue>Movies</option>
                        <option value="series">Series</option>
                        <option value="episode">Episodes</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      Year :
                      {' '}
                      <input
                        className="search-year"
                        type="tel"
                        name="yearSearch"
                        ref={searchYearRef}
                        autoComplete="off"
                        maxLength={4}
                        minLength={4}
                        pattern="[0-9]*"
                        onChange={searchValidation}
                      />
                    </div>
                    <div className="mt-2 advanced-select">
                      View :
                      {' '}
                      <select name="view">
                        <option value="paginated" defaultValue>Paginated View</option>
                        <option value="infinite">Infinite Scroll</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </div>
        </div>
        <Outlet context={[apiResponse, isFetchingData]} />
      </div>
    </div>
  );
}
