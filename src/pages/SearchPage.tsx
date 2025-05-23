import React, { useState, useRef, useEffect, useCallback } from "react";
import { Outlet, useNavigate, useParams, Link } from "react-router-dom";
import {
  UncontrolledAccordion,
  AccordionHeader,
  AccordionItem,
  AccordionBody,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import { fetchMoviesList, resetMoviesList, setPageView } from "redux/slicers/movieSlicer";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";

import logo from "assets/logo.gif";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchText } = useParams<{ searchText?: string }>();
  const movies = useAppSelector((state) => state.persistedState.movies);

  const searchTextRef = useRef<HTMLInputElement>(null);
  const searchYearRef = useRef<HTMLInputElement>(null);
  const searchTypeRef = useRef<HTMLSelectElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [favouritesPage, setFavouritesPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [executed, setExecuted] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const searchValidation = () => {
    if (searchTextRef.current && searchTextRef.current.value === "") {
      setErrorMessage("Please enter a search text");
    } else if (searchYearRef.current && searchYearRef.current.value !== "") {
      if (!searchYearRef.current.validity.valid) {
        setErrorMessage("Please enter a valid year");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  const onSearch = useCallback(() => {
    let searchCriterias = "";
    searchValidation();

    if (
      searchTextRef.current &&
      searchYearRef.current &&
      searchTypeRef.current &&
      searchTextRef.current.value !== "" &&
      searchYearRef.current.validity.valid
    ) {
      if (searchYearRef.current.value !== "") {
        searchCriterias = `&s=${searchTextRef.current.value}&type=${searchTypeRef.current.value}&y=${searchYearRef.current.value}`;
      } else {
        searchCriterias = `&s=${searchTextRef.current.value}&type=${searchTypeRef.current.value}`;
      }
      dispatch(resetMoviesList());
      dispatch(fetchMoviesList(searchCriterias));
      navigate(`/search/${searchTextRef.current.value}`);
    }
  }, [dispatch, navigate]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchValidation();
      onSearch();
    }
  };

  const pageViewHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "infinite") {
      dispatch(setPageView(true));
    } else {
      dispatch(setPageView(false));
    }
  };

  useEffect(() => {
    const fetchNextPage = (infiniteScroll: boolean, totalResults: number) => {
      if (!executed) {
        setExecuted(true);
        if (infiniteScroll && pageNumber < totalResults) {
          dispatch(fetchMoviesList(`&s=${searchText}&page=${pageNumber + 1}`));
          setPageNumber(pageNumber + 1);
        }
      }
    };

    const handleScroll = () => {
      if (scrollRef.current && window.location.pathname === `/search/${searchText}`) {
        const { scrollHeight } = scrollRef.current;
        if (window.scrollY >= scrollHeight - window.innerHeight) {
          fetchNextPage(movies.infiniteScroll, movies.totalResults);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies.infiniteScroll, movies.totalResults, searchText, pageNumber, executed, dispatch]);

  console.log('movies: ', movies);

  useEffect(() => {
    if (executed) {
      const timer = setTimeout(() => {
        setExecuted(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [executed]);

  useEffect(() => {
    if (searchTextRef.current) {
      if (searchText) {
        searchTextRef.current.value = searchText;
      } else {
        searchTextRef.current.value = "";
      }
    }
  }, [searchText]);

  useEffect(() => {
    if (!movies?.moviesList?.length && searchText) {
      dispatch(fetchMoviesList(`&s=${searchText}`));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/favourites" || window.location.pathname === "/trash") {
      setFavouritesPage(true);
    } else {
      setFavouritesPage(false);
    }
  }, []);

  return (
    <div className="movie-search-body">
      <div className="container movie-search-container text-center">
        <div className="header-part">
          <div className="nav-bar-contents">
            <Navbar>
              <NavbarBrand href="/">
                <div className="logo-part">
                  <img src={logo} alt="" />
                </div>
              </NavbarBrand>
              <Nav className="me-auto large-dev-nav d-none d-md-block" navbar>
                <NavItem className="navbar-item mx-2">
                  <Link className="nav-link btn btn-outline-secondary" to="/favourites">
                    Favourites
                  </Link>
                </NavItem>
                <NavItem className="mx-2">
                  <Link className="nav-link  btn btn-outline-secondary" to="/">
                    Home
                  </Link>
                </NavItem>
              </Nav>
              <NavbarToggler className="nav-bar-toggler d-md-none" onClick={toggle} />
              <Collapse isOpen={isOpen} navbar className="d-md-none">
                <Nav className="me-auto" navbar>
                  <NavItem>
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/favourites">
                      Favourites
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
          <div className={`searchbar ${favouritesPage ? "d-none" : ""}`}>
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
                {movies.isLoading ? (
                  <span className="spinner-border spinner-border-sm mx-1" role="status" />
                ) : (
                  ""
                )}
                Search
              </button>
            </div>
            {errorMessage ? <span className="error-msg">{errorMessage}</span> : ""}
          </div>

          <div className={`advanced-search ${favouritesPage ? "d-none" : ""}`}>
            <UncontrolledAccordion toggle={() => {}} stayOpen>
              <AccordionItem>
                <AccordionHeader targetId="1" className="accord-header text-center">
                  Advanced search ▽
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <div className="adv-search-criteria">
                    <div className="mt-2 advanced-select">
                      Type :{" "}
                      <select name="searchType" ref={searchTypeRef}>
                        <option value="movie" selected>
                          Movies
                        </option>
                        <option value="series">Series</option>
                        <option value="episode">Episodes</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      Year :{" "}
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
                      View :{" "}
                      <select
                        name="view"
                        onChange={pageViewHandle}
                        defaultValue={movies.infiniteScroll ? "infinite" : "paginated"}
                      >
                        <option value="paginated">Paginated View</option>
                        <option value="infinite">Infinite Scroll</option>
                      </select>
                    </div>
                  </div>
                </AccordionBody>
              </AccordionItem>
            </UncontrolledAccordion>
          </div>
        </div>
        <div ref={scrollRef}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
