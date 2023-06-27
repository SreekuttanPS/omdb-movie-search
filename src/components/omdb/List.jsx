import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
export default function List() {
  let { searchName } = useParams();
  const [moviesList, setMoviesList] = useState();
  const navigate = useNavigate();
  useMemo(() => {
    axios
      .get(
        "http://www.omdbapi.com/?apikey=522b328&type=movie&plot=full&s=" +
          searchName
      )
      .then((response) => {
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
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, [searchName]);

  return (
    <div id="contact">
      <div className="row w-100 my-3">{moviesList}</div>
    </div>
  );
}
