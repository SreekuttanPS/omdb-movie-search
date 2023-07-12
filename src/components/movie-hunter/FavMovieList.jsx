import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardText,
  Button,
  CardTitle,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { removeFromFav } from 'redux/slicers/movieSlicer';

import favourite from 'assets/favourite-icon.svg';
import notFavourite from 'assets/not-favourite.svg';
import noImage from 'assets/no-image.jpeg';

export default function FavMovieList() {
  const navigate = useNavigate();
  const favMoviesList = useSelector((state) => state.movies.favMovieList);
  const dispatch = useDispatch();
  const [favSearch, setFavSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (favSearch.length > 0 && favMoviesList.length > 0) {
      const temporary = [];
      favMoviesList.forEach((item) => {
        if (item.Title.toLowerCase().includes(favSearch.toLowerCase())) {
          temporary.push(item);
        }
      });
      setSearchResults(temporary);
    } else {
      setSearchResults(favMoviesList);
    }
  }, [favSearch, favMoviesList]);

  return (
    <div className="content-section w-100">
      <div className="row my-3 movie-list-section">
        <h3 className="text-white">
          Favourites
        </h3>

        <div className="searchbar">
          <div className="input-section">
            <input
              aria-label="Search contacts"
              placeholder="Search in favorites..."
              type="search"
              name="search"
              autoComplete="off"
              onChange={(e) => setFavSearch(e.target.value)}
            />
          </div>
        </div>

        {searchResults.length ? searchResults.map((item) => (
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
                {' >>'}
              </Button>
              <Button
                className="add-to-fav-button"
                onClick={() => dispatch(removeFromFav(item.imdbID))}
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
        )) : <span className="text-danger mt-5"> No favourites found! </span>}
      </div>
    </div>
  );
}
