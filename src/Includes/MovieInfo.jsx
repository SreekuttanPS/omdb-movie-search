import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

export const MovieInfo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchParams.get("token")) {
      detailShow(searchParams.get("token"));
    }
  }, []);

  const detailShow = (imdbID) => {
    if (imdbID) {
      setIsLoading(true);
      axios
        .get(
          "https://www.omdbapi.com/?apikey=522b328&type=movie&plot=full&i=" +
            imdbID
        )
        .then((response) => {
          setMovieInfo(response.data);
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 1500);
          return () => clearTimeout(timer);
        })
        .catch(function (error) {
          setErrorMessage("No results found, Please try again");
        });
    }
  };
  return (
    <>
      {isLoading ? <Loader /> : null}
      <div className="container w-100 p-5">
        <Form>
          <h2>{movieInfo?.Title}</h2>
          <Card style={{ width: "18rem" }} className="mt-3">
            <Card.Img variant="top" src={movieInfo?.Poster} />
          </Card>
          <div className="d-grid gap-2 d-md-block">
            <p className="mt-3">IMDb Rating : {movieInfo?.imdbRating}</p>
            <p>Release Date : {movieInfo?.Released}</p>
            <p>Time : {movieInfo?.Runtime}</p>
            <p>Genre : {movieInfo?.Genre}</p>
            <p>Director : {movieInfo?.Director}</p>
            <p>Writer(s) : {movieInfo?.Writer}</p>
            <p>Actors : {movieInfo?.Actors}</p>
            <p>Language : {movieInfo?.Language}</p>
            <p>Awards : {movieInfo?.Awards}</p>
            <p>Plot : {movieInfo?.Plot}</p>
          </div>
          <Button
            className="m-3"
            variant="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            {" Back <<"}
          </Button>
        </Form>
      </div>
    </>
  );
};
