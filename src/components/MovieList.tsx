import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardBody,
//   CardText,
//   Button,
//   CardTitle,
// } from 'reactstrap';

import { addToFav, removeFromFav } from "redux/slicers/favouriteSlicer";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";

import { generateRandomString } from "helpers/utils";

import PaginationComponent from "components/PaginationComponent";
import LoginPopup from "components/LoginPopup";

import favourite from "assets/favourite-icon.svg";
import notFavourite from "assets/not-favourite.svg";
import noImage from "assets/no-image.jpeg";
import { FavMovieType } from "helpers/sharedTypes";

export default function MovieList() {
  const navigate = useNavigate();
  const movies = useAppSelector((state) => state.persistedState.movies);
  const favouritesList = useAppSelector((state) => state.persistedState.favourites.present);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const addToFavhandle = (item: FavMovieType) => {
    if (movies.isLoggedIn) {
      dispatch(addToFav(item));
    } else {
      setIsModalOpen(true);
    }
  };

  const removeFromFavHandle = (imdbID: string) => {
    if (movies.isLoggedIn) {
      dispatch(removeFromFav(imdbID));
    } else {
      setIsModalOpen(true);
    }
  };

  const loginModalHandle = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="content-section w-100">
        <div className="row my-3 movie-list-section">
          {movies.error ? <span className="text-danger m-5">{movies.error}</span> : ""}
          {movies.moviesList.map((item) => (
            <div className="col-12 col-md-6 col-lg-3 mx-2 mt-3 mb-5" key={generateRandomString()}>
              <div className="movie-card">
                <div className="movie-card-content">
                  <Card
                    style={{
                      width: "11rem",
                      height: "20rem",
                    }}
                  >
                    {item.Poster === "N/A" ? (
                      <img className="movie-image" alt="Movie" src={noImage} />
                    ) : (
                      <img className="movie-image" alt="Movie" src={item.Poster} />
                    )}
                    <CardBody>
                      <CardTitle className="movie-title" tag="h6">
                        {item.Title}
                      </CardTitle>
                      <CardText className="movie-year">
                        <span>{`Year : ${item.Year}`}</span>
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
                  More Details {" >>"}
                </Button>

                {favouritesList.favList.find((element) => element.imdbID === item.imdbID) ? (
                  <Button
                    className="add-to-fav-button"
                    onClick={() => removeFromFavHandle(item.imdbID)}
                  >
                    <span>Remove favourites!</span>
                    <img className="favourite-icon" src={favourite} alt="" />
                  </Button>
                ) : (
                  <Button className="add-to-fav-button" onClick={() => addToFavhandle(item)}>
                    <span>Add to favourites</span>
                    <img className="not-favourite-icon" src={notFavourite} alt="" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!movies.infiniteScroll ? (
        <div className="footer-section">
          {movies.totalResults > 10 ? (
            <div className="pagination-section">
              <PaginationComponent />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="footer-section">
          {movies.isLoading ? (
            <>
              <div className="spinner-grow text-light mx-2 mb-3" role="status">
                <span className="sr-only" />
              </div>
              <div className="spinner-grow text-light mx-2 mb-3" role="status">
                <span className="sr-only" />
              </div>
              <div className="spinner-grow text-light mx-2 mb-3" role="status">
                <span className="sr-only" />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
      <LoginPopup open={isModalOpen} onCancel={loginModalHandle} />
    </>
  );
}
