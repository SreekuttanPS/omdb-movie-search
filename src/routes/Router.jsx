import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import List from "../components/omdb/List";
import Info from "../components/omdb/Info";
import Omdb from "../pages/Omdb";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Omdb />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/search/:searchName",
        element: <List />,
      },
      {
        path: "/:searchId/details",
        element: <Info />,
      },
    ],
  },
]);
