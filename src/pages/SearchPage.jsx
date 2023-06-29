import { useState, useRef, useEffect, useCallback } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

let baseUrl = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_API_KEY
}&type=movie&plot=full&s=`;

export default function SearchPage() {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  const searchTextRef = useRef(null);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  let { searchText, movieTitle } = useParams();

  const movieListFetch = useCallback(
    (url) => {
      setIsFetchingData(true);

      navigate(`/search/${searchTextRef.current.value}`);
      axios
        .get(url)
        .then((response) => {
          setIsFetchingData(false);
          if (response.data.Response == "True") {
            setApiError("");
            setMoviesList(response.data.Search);
          } else {
            toast.error(`Oops! ${response.data.Error}`);
          }
        })
        .catch(function (error) {
          setIsFetchingData(false);
          toast.error(`Oops! ${error}`);
        });
    },
    [navigate]
  );

  const searchValidation = () => {
    if (searchTextRef.current.value === "") {
      setErrorMessage("Please enter a search text");
      searchTextRef.current.focus();
    } else {
      setErrorMessage("");
    }
  };

  const onSearch = useCallback(() => {
    if (searchTextRef.current.value != "") {
      let url = `${baseUrl}${searchTextRef.current.value}`;
      movieListFetch(url);
    }
  }, [movieListFetch]);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
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
      searchTextRef.current.value = "";
    }
    if (searchText && isInitialMount.current) {
      onSearch();
    }
    isInitialMount.current = false;
  }, [onSearch, searchText, movieTitle]);

  return (
    <>
      <div id="searchbar">
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
        <div>
          <div className="grouping">
            <div>
              <input
                ref={searchTextRef}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="search"
                onKeyUp={handleKeyUp}
                onBlur={searchValidation}
              />

              <div className="sr-only" aria-live="polite"></div>
              <button className="mx-2" onClick={onSearch}>
                {isFetchingData ? (
                  <span
                    className="spinner-border spinner-border-sm mx-1"
                    role="status"
                  ></span>
                ) : null}
                Search
              </button>
            </div>
            {errorMessage !== "" ? (
              <div className="errorMsg">{errorMessage}</div>
            ) : null}
          </div>
        </div>
      </div>
      <div id="detail">
        <Outlet context={[apiError, moviesList]} />
      </div>
    </>
  );
}
