import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "pages/ErrorPage";
import MovieInfo from "components/MovieInfo";
import Trash from "components/Trash";
import Home from "pages/Home";
import MoviesList from "components/MoviesList";

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
        path: "/favourites",
        element: <MoviesList />,
      },
      {
        path: "/trash",
        element: <Trash />,
      },
    ],
  },
]);

export default router;
