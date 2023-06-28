import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import ErrorPage from "../pages/ErrorPage";
import List from "../components/omdb/List";
import Info from "../components/omdb/Info";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/search/:searchText",
        element: <List />,
      },
      {
        path: "/:imdbId/:searchText/details",
        element: <Info />,
      },
    ],
  },
]);
