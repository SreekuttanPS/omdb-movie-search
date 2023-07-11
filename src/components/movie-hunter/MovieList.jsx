import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardText,
  Button,
  CardTitle,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { addMovieToFav } from 'redux/slicers/movieSlicer';

import favourite from 'assets/favourite-icon.svg';
import notFavourite from 'assets/not-favourite.svg';
import noImage from 'assets/no-image.jpeg';
import PaginationComponent from 'components/movie-hunter/PaginationComponent';

export default function MovieList() {
  const navigate = useNavigate();
  const moviesList = useSelector((state) => state.movies.moviesList);
  const error = useSelector((state) => state.movies.error);
  const totalResults = useSelector((state) => state.movies.totalResults);
  const dispatch = useDispatch();

  return (
    <>
      <div className="content-section w-100">
        <div className="row my-3 movie-list-section">
          {error ? (
            <span className="text-danger m-5">
              {error}
            </span>
          ) : (
            ''
          )}
          {moviesList.map((item) => (
            <div className="col-12 col-md-6 col-lg-3 mx-2 mt-3 mb-5" key={item.imdbID}>
              <div className="movie-card">
                <div className="movie-card-content">
                  <Card
                    style={{
                      width: '11rem',
                      height: '20rem',
                    }}
                  >
                    {item.Poster === 'N/A' ? (
                      <img
                        className="movie-image"
                        alt="Movie"
                        src={noImage}
                      />
                    ) : (
                      <img
                        className="movie-image"
                        alt="Movie"
                        src={item.Poster}
                      />
                    )}
                    <CardBody>
                      <CardTitle className="movie-title" tag="h6">
                        {item.Title}
                      </CardTitle>
                      <CardText className="movie-year">
                        <span>
                          {`Year : ${item.Year}`}
                        </span>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
                <Button
                  className="movie-card-button"
                  variant="primary"
                  onClick={() => {
                    navigate(`/${item.imdbID}/${item.Title}/details`);
                  }}
                >
                  More Details
                  {' '}
                  {' >>'}
                </Button>
                <Button
                  className="add-to-fav-button"
                  onClick={() => dispatch(addMovieToFav(item.imdbID))}
                >
                  {item.isFavourite
                    ? (
                      <>
                        <span>
                          Added to favourites!
                        </span>
                        <img className="favourite-icon" src={favourite} alt="" />
                      </>
                    )
                    : (
                      <>
                        <span>
                          Add to favourites
                        </span>
                        <img className="not-favourite-icon" src={notFavourite} alt="" />
                      </>
                    )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-section">
        {totalResults > 10 ? (
          <div className="pagination-section">
            <PaginationComponent />
          </div>
        ) : ''}
      </div>
    </>
  );
}
