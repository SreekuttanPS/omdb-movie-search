import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";

import { fetchMovieInfo } from "redux/slicers/movieSlicer";
import StarRating from "components/StarRating";

export default function MovieInfo() {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movieInfo = useAppSelector((state) => state?.persistedState?.movies?.selectedMovie);
  const loader = useAppSelector((state) => state?.persistedState?.movies?.isLoading);

  useEffect(() => {
    if (imdbId) {
      dispatch(fetchMovieInfo(imdbId));
    }
  }, [dispatch, imdbId]);

  console.log("movieInfo: ", movieInfo);

  return (
    <div className="flex items-center justify-center bg-blue-600 bg-[url(/src/assets/images/list-bg-image.webp)] bg-blend-multiply">
      <div className="min-h-[89vh] text-white font-sans p-8 flex flex-col">
        <div className="flex flex-col md:items-start items-center md:flex-row gap-12">
          <img
            src={movieInfo.Poster}
            alt={movieInfo.Title}
            className="md:w-[100vw] w-[70vw] max-w-90 object-cover rounded overflow-hidden"
            loading="lazy"
          />
          <div className="mb-8 z-10">
            <h1 className="text-5xl font-bold text-red-600 mb-2 [text-shadow:_0_0_2px_#ff0000,_0_0_10px_#ff0000]">
              {movieInfo?.Title || "Movie Title Not Found"}
            </h1>
            <h2 className="text-2xl font-bold text-blue-400 [text-shadow:_0_0_2px_#00a8ff,_0_0_10px_#00a8ff]">
              {movieInfo?.Year || "Year Not Found"}
            </h2>
            <p className="text-gray-300 mb-2">{movieInfo?.Plot || "Plot Not Found"}</p>
            <div className="gap-2 hidden md:flex">
              {movieInfo?.Genre?.split(",").map((genre) => (
                <span className="border rounded-full px-2">{genre}</span>
              ))}
            </div>

            <p className="text-gray-300 mt-4 md:hidden">
              Genre: &nbsp;{movieInfo?.Genre || "Unknown Genre"}
            </p>
            <p className="text-gray-300 mt-4">
              Director: &nbsp;{movieInfo?.Director || "Unknown Director"}
            </p>
            <p className="text-gray-300 mt-4">
              Writers: &nbsp;{movieInfo?.Writer || "Unknown Writer"}
            </p>
            <p className="text-gray-300 mt-4">
              Starring: &nbsp;{movieInfo?.Actors || "Unknown Actors"}
            </p>
            <p className="text-gray-300 mt-4">
              IMDB Rating: &nbsp;{movieInfo?.Director || "Unknown Director"}
            </p>
            {movieInfo?.Awards && movieInfo?.Awards !== "N/A" ? (
              <p className="text-gray-300 mt-4">Awards: {movieInfo?.Awards || "No Awards Found"}</p>
            ) : null}
            {movieInfo?.imdbVotes ? (
              <p className="text-gray-300 mt-4">
                {movieInfo?.imdbVotes}&nbsp; voted for this movie on IMDB.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
