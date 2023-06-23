import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";

export const MovieList = () => {
  let baseURL =
    "http://www.omdbapi.com/?apikey=522b328&type=movie&plot=full&s=";
  let moviesList;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [apiResponse, setApiResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const onSearch = (text) => {
    if (!text) {
      text = searchText;
    }
    if (text != "") {
      setIsLoading(true);
      let apiUrl = baseURL + text;
      navigate("/search?searchtext=" + text);
      axios
        .get(apiUrl)
        .then((response) => {
          moviesList = response.data.Search.map(function (item, i) {
            return (
              <div className="col-12 col-md-6 col-lg-3" key={i}>
                <Card>
                  <Card.Img
                    className="card-image"
                    variant="top"
                    src={item.Poster}
                  />
                  <Card.Body>
                    <Card.Title>{item.Title}</Card.Title>
                    <Card.Text>{item.Year}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate("/info?token=" + item.imdbID);
                      }}
                    >
                      More Details {" >>"}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          });
          setApiResponse(moviesList);
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          return () => clearTimeout(timer);
        })
        .catch(function (error) {
          setErrorMessage("No results found, Please try again");
        });
    } else {
      setErrorMessage("No movie found");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchParams.get("searchtext")) {
        setSearchText(searchParams.get("searchtext"));
        onSearch(searchParams.get("searchtext"));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className={`container m-3`}>
        <div>
          <Form>
            <h2>MOVIE SEARCH</h2>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                type="text"
                name="searchtext"
                placeholder="Enter the movie name..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                  onSearch(searchText);
                }}
              >
                Search
              </Button>
            </div>
          </Form>

          <div className="row w-100 my-3">{apiResponse}</div>
        </div>
      </div>
    </>
  );
};
