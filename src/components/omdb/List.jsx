import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
export default function List() {
  let { searchName } = useParams();
  const [moviesList, setMoviesList] = useState();
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  useMemo(() => {
    axios
      .get(
        "https://www.omdbapi.com/?apikey=" +
          import.meta.env.VITE_API_KEY +
          "&type=movie&plot=full&s=" +
          searchName
      )
      .then((response) => {
        if (response.data.Response == "True") {
          setHasError(false);
          let list = response.data.Search.map(function (item, i) {
            return (
              <div className="col-12 col-md-6 col-lg-3 p-2" key={i}>
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
                        navigate(`/${item.Title}/details`);
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
          setHasError(true);
          setMoviesList(response.data.Error);
        }
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, [searchName]);

  return (
    <div id="contact">
      <div className="row w-100 my-3">
        {!hasError ? (
          moviesList
        ) : (
          <div className="text-center text-danger">{moviesList}</div>
        )}
      </div>
    </div>
  );
}
