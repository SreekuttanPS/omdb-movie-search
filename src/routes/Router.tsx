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
      },
      {
        path: "/series",
        element: <MoviesList />,
      },
      {
        path: "/episode",
        element: <MoviesList />,
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
