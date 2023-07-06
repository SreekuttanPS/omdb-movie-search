import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardText,
  Button,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import favourite from 'assets/favourite-icon.svg';
import notFavourite from 'assets/not-favourite.svg';

export default function MovieList() {
  const navigate = useNavigate();
  const [moviesList, isFetchingData] = useOutletContext();

  return (
    <>
      <div className="content-section">
        <div className="row my-3 movie-list-section">
          {!moviesList.length && !isFetchingData ? (
            <span className="text-danger m-5">
              Some error occured, Please try again!
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
                    <img
                      className="movie-image"
                      alt="Movie"
                      src={item.Poster}
                    />
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
                >
                  Add to favourites
                  <img className="favourite-icon" src={favourite} alt="" />
                  <img className="not-favourite-icon" src={notFavourite} alt="" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-section">
        <div className="pagination-section">
          <Pagination>
            <PaginationItem>
              <PaginationLink
                first
                href="#"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                previous
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                next
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                last
              />
            </PaginationItem>
          </Pagination>

        </div>
      </div>
    </>
  );
}
