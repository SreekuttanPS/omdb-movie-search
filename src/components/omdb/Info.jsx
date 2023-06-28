import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";

export default function Info() {
  let { imdbId } = useParams();
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_API_KEY
        }&type=movie&plot=full&i=${imdbId}`
      )
      .then((response) => {
        setMovieInfo(response.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, [imdbId]);

  return (
    <div id="contact">
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
    </div>
  );
}
