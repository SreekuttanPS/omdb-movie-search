import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SearchPage from 'pages/SearchPage';
import ErrorPage from 'pages/ErrorPage';
import MovieList from 'components/movie-hunter/MovieList';
import MovieInfo from 'components/movie-hunter/MovieInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/search/:searchText',
        element: <MovieList />,
      },
      {
        path: '/:imdbId/:movieTitle/details',
        element: <MovieInfo />,
      },
    ],
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
