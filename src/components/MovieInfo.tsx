import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/redux-hooks";

import { fetchMovieInfo } from "redux/slicers/movieSlicer";
import StarRating from "components/StarRating";
import PreviosIcon from "assets/svg/PreviosIcon";

export default function MovieInfo() {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movieInfo = useAppSelector((state) => state?.persistedState?.movies?.selectedMovie);
  const isLoading = useAppSelector((state) => state?.persistedState?.movies?.isLoading || false);

  useEffect(() => {
    if (imdbId) {
      dispatch(fetchMovieInfo(imdbId));
    }
  }, [dispatch, imdbId]);

  console.log("movieInfo: ", movieInfo);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex border border-red-600 mt-3 ms-2 py-1 px-2 hover:scale-110 hover:border-red-900 rounded-full cursor-pointer"
      >
        <div className="animate-bounce rotate-90 me-2">
          <PreviosIcon width={15} className="rotate-270" />
        </div>
        Go Back
      </button>
      <div className="flex items-center justify-center bg-blue-600 bg-[url(/src/assets/images/list-bg-image.webp)] bg-blend-multiply">
        {isLoading ? (
          <div className="animate-pulse min-h-[89vh] text-white font-sans p-8 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-start items-center gap-12">
              <div className="w-[80vw] h-[50vh] md:w-[30vw] md:h-[60vh] bg-gray-500" />
              <div className="w-[80vw] h-[30vh] md:w-[60vw] md:h-[55vh]">
                <div className="w-[80%] rounded-full h-7 bg-gray-500 mt-5" />
                <div className="w-[25%] rounded-full h-7 bg-gray-500 mt-5 mb-15" />
                <div className="w-[80%] rounded-full h-7 bg-gray-500 mt-9" />
                <div className="w-[75%] rounded-full h-7 bg-gray-500 mt-9 hidden md:block" />
                <div className="w-[77%] rounded-full h-7 bg-gray-500 mt-9 hidden md:block" />
                <div className="w-[70%] rounded-full h-7 bg-gray-500 mt-9 hidden md:block" />
                <div className="w-[80%] rounded-full h-7 bg-gray-500 mt-9 hidden md:block" />
                <div className="w-[75%] rounded-full h-7 bg-gray-500 mt-9 hidden md:block" />
              </div>
            </div>
          </div>
        ) : (
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
                    <span className="border rounded-full px-2" key={genre}>
                      {genre}
                    </span>
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
                  IMDB Rating: &nbsp;{movieInfo?.imdbRating || "Unknown Rating"}
                </p>
                <div className="mt-4">
                  <StarRating rating={movieInfo?.imdbRating} />
                </div>
                {movieInfo?.Awards && movieInfo?.Awards !== "N/A" ? (
                  <p className="text-gray-300 mt-4">
                    Awards: {movieInfo?.Awards || "No Awards Found"}
                  </p>
                ) : null}
                {movieInfo?.imdbVotes ? (
                  <p className="text-gray-300 mt-4">
                    {movieInfo?.imdbVotes}&nbsp; voted for this movie on IMDB.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
