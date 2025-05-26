import { createBrowserRouter } from "react-router-dom";

import SearchPage from "pages/SearchPage";
import ErrorPage from "pages/ErrorPage";
import MovieList from "components/MovieList";
import MovieInfo from "components/MovieInfo";
import FavMovieList from "components/FavMovieList";
import Trash from "components/Trash";
import Home from "pages/Home";
import MoviesList from "components/v2/MoviesList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/movie",
        element: <MoviesList />,
        children: [
          {
            path: "/movie/:searchText",
            element: <MoviesList />,
            children: [],
          },
        ],
      },
      {
        path: "/series",
        element: <MoviesList />,
        children: [
          {
            path: "/series/:searchText",
            element: <MoviesList />,
            children: [],
          },
        ],
      },
      {
        path: "/episode",
        element: <MoviesList />,
        children: [
          {
            path: "/episode/:searchText",
            element: <MoviesList />,
            children: [],
          },
        ],
      },
      {
        path: "/info/:imdbId",
        element: <MovieInfo />,
      },
      {
        path: "/search/:searchText",
        element: <MovieList />,
      },
      {
        path: "/favourites",
        element: <FavMovieList />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
    ],
  },
  {
    path: "/search",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
