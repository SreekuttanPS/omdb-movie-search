import { createBrowserRouter } from 'react-router-dom';

import SearchPage from 'pages/SearchPage';
import ErrorPage from 'pages/ErrorPage';
import MovieList from 'components/MovieList';
import MovieInfo from 'components/MovieInfo';
import FavMovieList from 'components/FavMovieList';
import Trash from 'components/Trash';

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
      {
        path: '/favourites',
        element: <FavMovieList />,
      },
      {
        path: '/trash',
        element: <Trash />,
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
