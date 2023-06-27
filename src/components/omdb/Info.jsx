import React, { useState, useEffect, useMemo } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Info() {
  let { searchId } = useParams();
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState();

  useMemo(() => {
    axios
      .get(
        "https://www.omdbapi.com/?apikey=522b328&type=movie&plot=full&t=" +
          searchId
      )
      .then((response) => {
        setMovieInfo(response.data);
        const timer = setTimeout(() => {}, 1500);
        return () => clearTimeout(timer);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, [searchId]);

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
