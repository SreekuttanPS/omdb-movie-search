import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { ActionCreators } from 'redux-undo';

import { moveToTrash } from 'redux/slicers/favouriteSlicer';
import { useAppDispatch, useAppSelector } from 'redux/redux-hooks';

import AlertBox from 'components/AlertBox';

import favourite from 'assets/favourite-icon.svg';
import noImage from 'assets/no-image.jpeg';
import binImage from 'assets/bin.png';
import helpImage from 'assets/help.png';
import undoImage from 'assets/undo.png';
import redoImage from 'assets/redo.png';
import { FavMovieType } from 'helpers/sharedTypes';

export default function FavMovieList() {
  const navigate = useNavigate();
  const favMoviesList = useAppSelector((state) => state.persistedState.favourites);
  const dispatch = useAppDispatch();
  const [favSearch, setFavSearch] = useState('');
  const [searchResults, setSearchResults] = useState<FavMovieType[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('favMoviesList: ', favMoviesList);

  const multiSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, imdbID: string) => {
    if (e.ctrlKey) {
      const tempArray = [...selectedItems];
      const found = tempArray.findIndex((element) => element === imdbID);
      if (found !== -1) {
        tempArray.splice(found, 1);
        setSelectedItems(tempArray);
      } else {
        setSelectedItems((prevState) => [...prevState, imdbID]);
      }
    }
  };

  const removeItemHandle = (imdbID: string) => {
    setSelectedItems((prevState) => [...prevState, imdbID]);
    setIsModalOpen(true);
  };

  const moveItemsToTrash = (bool: boolean) => {
    setIsModalOpen(false);
    if (bool) {
      dispatch(moveToTrash(selectedItems));
      setSelectedItems([]);
    } else {
      setSelectedItems([]);
    }
  };

  const onMultiDelete = () => {
    if (selectedItems.length > 0) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const temporaryArray: FavMovieType[] = [];
    if (favSearch.length > 0 && favMoviesList.present.favList.length > 0) {
      favMoviesList.present.favList.forEach((item) => {
        if ((item.Title.toLowerCase().includes(favSearch.toLowerCase()) && !item.isTrash)) {
          temporaryArray.push(item);
        }
      });
      setSearchResults(temporaryArray);
    } else {
      favMoviesList.present.favList.forEach((item) => {
        if ((!item.isTrash)) {
          temporaryArray.push(item);
        }
      });
      setSearchResults(temporaryArray);
    }
  }, [favSearch, favMoviesList.present, selectedItems]);

  useEffect(() => {
    dispatch(ActionCreators.clearHistory());
  }, [dispatch]);

  return (
    <div className="content-section w-100">
      <div className="row my-3 movie-list-section">
        <h3 className="text-white">
          Favourites
        </h3>

        <Navbar expand className="favourites-nav">
          <Nav>
            <NavItem>
              <Link className="trash-link ms-2 text-dark" to="/trash">Trash</Link>
            </NavItem>
            <NavItem>
              <button
                type="button"
                className="text-center"
                onClick={() => dispatch(ActionCreators.redo())}
              >
                <img src={helpImage} alt="help" title="Help" />

              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                className="text-center"
                onClick={onMultiDelete}
              >
                <img src={binImage} alt="bin" title="Delete" />

              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                className="text-center"
                onClick={() => dispatch(ActionCreators.undo())}
              >
                <img src={undoImage} alt="undo" title="Undo" />
              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                className="text-center"
                onClick={() => dispatch(ActionCreators.redo())}
              >
                <img src={redoImage} alt="redo" title="Redo" />

              </button>
            </NavItem>
          </Nav>
        </Navbar>

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
            <div
              className={`movie-card ${(selectedItems.findIndex((element) => element === item.imdbID) !== -1 ? 'border-class' : '')}`}
              onClick={(e) => multiSelect(e, item.imdbID)}
              role="presentation"
            >
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
                onClick={() => removeItemHandle(item.imdbID)}
              >
                <span>
                  Remove
                </span>
                <img className="favourite-icon" src={favourite} alt="" />
              </Button>
            </div>
          </div>
        )) : <span className="text-danger mt-5"> No favourites found! </span>}
      </div>
      <AlertBox
        isModalOpen={isModalOpen}
        modalClickHandle={moveItemsToTrash}
        modalContent="Are you sure? Removed items will be moved to trash. You can undo the action by clicking the undo button."
        modalTitle="Move to trash"
      />
    </div>
  );
}
