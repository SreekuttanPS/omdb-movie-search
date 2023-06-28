import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export default function SearchPage() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [apiError, setApiError] = useState({ error: false, message: "" });
  const [moviesList, setMoviesList] = useState([]);
  const searchTextRef = useRef();
  const navigate = useNavigate();
  let { searchText } = useParams();
  const errorTostify = (error) =>
    toast.error(`Oops! ${error}`, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const onSearch = () => {
    setLoadingSpinner(true);
    if (searchTextRef.current.value != "") {
      axios
        .get(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&type=movie&plot=full&s="${searchTextRef.current.value}`
        )
        .then((response) => {
          if (response.data.Response == "True") {
            setApiError({ error: false, message: "" });
            let list = response.data.Search.map(function (item) {
              return (
                <div className="col-12 col-md-6 col-lg-3 p-2" key={item.imdbID}>
                  <Card>
                    <Card.Img
                      className="card-image p-2"
                      variant="top"
                      src={item.Poster}
                    />
                    <Card.Body>
                      <Card.Title>{item.Title}</Card.Title>
                      <Card.Text>{item.Year}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          navigate(`/${item.imdbID}/${searchText}/details`);
                        }}
                      >
                        More Details {" >>"}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            });
            setMoviesList(list);
          } else {
            setApiError({ error: true, message: response.data.Error });
          }
        })
        .catch(function (error) {
          errorTostify(error);
          console.warn(error);
        });
      setLoadingSpinner(false);
      setErrorMessage(false);
      navigate(`/search/${searchTextRef.current.value}`);
    } else {
      setErrorMessage(true);
    }
    setLoadingSpinner(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  useEffect(() => {
    searchText ? (searchTextRef.current.value = searchText) : null;
    onSearch();
  }, []);

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
                onKeyUp={handleKeyDown}
              />

              <div className="sr-only" aria-live="polite"></div>
              <button className="mx-2" onClick={onSearch}>
                Search
                {loadingSpinner ? (
                  <span
                    className="spinner-border spinner-border-sm mx-1"
                    role="status"
                  ></span>
                ) : null}
              </button>
            </div>
            {errorMessage && (
              <div className="errorMsg">Invalid Search text</div>
            )}
          </div>
        </div>
      </div>
      <div id="detail">
        <Outlet context={[apiError, moviesList]} />
      </div>
    </>
  );
}
