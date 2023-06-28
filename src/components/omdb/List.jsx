import React from "react";
import { useOutletContext } from "react-router-dom";

export default function List() {
  const [apiError, moviesList] = useOutletContext();
  return (
    <div id="contact">
      <div className="row w-100 my-3">
        {!apiError.error ? (
          moviesList
        ) : (
          <div className="text-center text-danger">{apiError.message}</div>
        )}
      </div>
    </div>
  );
}
