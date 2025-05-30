import React, { useState, useEffect, JSX } from 'react';
import { useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardBody,
//   CardText,
//   Button,
//   CardTitle,
//   Nav,
//   Navbar,
//   NavItem,
// } from 'reactstrap';

import { removePermanently } from 'redux/slicers/favouriteSlicer';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';

import AlertBox from 'components/AlertBox';

// import favourite from 'assets/favourite-icon.svg';
// import noImage from 'assets/no-image.jpeg';
// import binImage from 'assets/bin.png';
// import helpImage from 'assets/help.png';
import { FavMovieType } from 'helpers/sharedTypes';

export default function Trash(): JSX.Element {
  const navigate = useNavigate();
  const favMoviesList = useAppSelector((state) => state.persistedState.favourites.present.favList);
  const [trashList, setTrashList] = useState<FavMovieType[]>([]);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const permanentRemove = (bool: boolean) => {
    setIsModalOpen(false);
    if (bool) {
      dispatch(removePermanently(selectedItems));
      setSelectedItems([]);
    } else {
      setSelectedItems([]);
    }
  };

  const removeItem = (imdbID: string) => {
    setSelectedItems((prevState) => [...prevState, imdbID]);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const trash: FavMovieType[] = [];
    favMoviesList.forEach((item) => {
      if (item.isTrash) {
        trash.push(item);
      }
    });
    setTrashList(trash);
  }, [favMoviesList]);

  return (
    <div className="content-section w-100">
      <div className="row my-3 movie-list-section">
        <h3 className="text-white">
          Trash
        </h3>

        <Navbar expand className="favourites-nav">
          <Nav>
            <NavItem>
              <button
                type="button"
                className="text-center"
              >
                <img src={helpImage} alt="help" title="Help" />

              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                className="text-center"
              >
                <img src={binImage} alt="bin" title="Delete" />

              </button>
            </NavItem>
          </Nav>
        </Navbar>

        {trashList.length ? trashList.map((item) => (
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
                onClick={() => removeItem(item.imdbID)}
              >
                <span>
                  Remove
                </span>
                <img className="favourite-icon" src={favourite} alt="" />
              </Button>
            </div>
          </div>
        )) : <span className="text-danger mt-5"> Nothing in the trash! </span>}
      </div>
      <AlertBox
        isModalOpen={isModalOpen}
        modalClickHandle={permanentRemove}
        modalContent="Are you Sure? This cannot be undone."
        modalTitle="Remove"
      />
    </div>
  );
}
