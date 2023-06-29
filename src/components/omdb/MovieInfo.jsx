import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

let url = `https://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_API_KEY
}&type=movie&plot=full`;

export default function MovieInfo() {
  let { imdbId } = useParams();
  const navigate = useNavigate();
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}&i=${imdbId}`)
      .then((response) => {
        setIsLoading(false);
        setMovieInfo(response.data);
      })
      .catch(function (error) {
        toast.error(`Oops! ${error}`);
      });
  }, [imdbId]);

  return (
    <div id="contact">
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
      {isLoading ? (
        <div className="container w-100 p-5 text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
