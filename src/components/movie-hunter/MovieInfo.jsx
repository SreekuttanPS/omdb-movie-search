import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovieInfo } from 'redux/slicers/movieSlicer';
import StarRating from 'components/movie-hunter/StarRating';

export default function MovieInfo() {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieInfo = useSelector((state) => state.reduxState.movies.currentSelectedMovie);
  const loader = useSelector((state) => state.reduxState.movies.isLoading);

  useEffect(() => {
    dispatch(fetchMovieInfo(imdbId));
  }, []);

  return (
    <div className="movie-info-section">
      {loader ? (
        <div className="info-loading container w-100 p-5 text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container w-100">
          <Form className="movie-info-form">
            <h2>{movieInfo?.Title}</h2>
            <img className="movie-info-image" src={movieInfo?.Poster} alt="" />
            <div className="movie-info-description d-grid gap-2 d-md-block">
              <span className="mt-3">
                IMDb Rating :
                {' '}
                {movieInfo?.imdbRating}
                {' '}
                /10
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
