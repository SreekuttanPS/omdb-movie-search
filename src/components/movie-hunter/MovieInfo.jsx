import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button,
  Form,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import StarRating from 'components/movie-hunter/StarRating';

const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&type=movie&plot=full`;

export default function MovieInfo() {
  const { imdbId } = useParams();
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
      .catch((error) => {
        setIsLoading(false);
        toast.error(`Oops! ${error}`);
      });
  }, [imdbId]);

  return (
    <div className="movie-info-section">
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
        <div className="info-loading container w-100 p-5 text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container w-100">
          <Form className="text-secondary">
            <h2>{movieInfo?.Title}</h2>
            <img className="movie-info-image" src={movieInfo?.Poster} alt="" />
            <div className="movie-info-description d-grid gap-2 d-md-block">
              <span className="mt-3">
                IMDb Rating :
                {' '}
                {movieInfo?.imdbRating}
              </span>
              {Object.keys(movieInfo).length > 0 ? (
                <span className="w-100">
                  <StarRating
                    rating={movieInfo?.imdbRating}
                    starBorderWidth={15}
                    starBorderColor="#B67F40"
                    fullStarColor="#FACD3A"
                    emptyStarColor="white"
                  />
                </span>
              ) : (
                ''
              )}

              <span>
                {`Release Date : ${movieInfo?.Released}`}
              </span>
              <span>
                {`Time : ${movieInfo?.Runtime}`}
              </span>
              <span>
                {`Genre : ${movieInfo?.Genre}`}
              </span>
              <span>
                {`Director : ${movieInfo?.Director}`}
              </span>
              <span>
                {`Writer(s) : ${movieInfo?.Writer}`}
              </span>
              <span>
                {`Actors : ${movieInfo?.Actors}`}
              </span>
              <span>
                {`Language : ${movieInfo?.Language}`}
              </span>
              <span>
                {`Awards : ${movieInfo?.Awards}`}
              </span>
              <span>
                {`Plot : ${movieInfo?.Plot}`}
              </span>
            </div>
            <Button
              className="m-3"
              variant="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              {' Back <<'}
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}
