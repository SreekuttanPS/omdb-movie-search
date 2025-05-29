import { CategoryType } from "helpers/sharedTypes";
import { getCurrentPath } from "helpers/utils";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "redux/redux-hooks";
import { fetchMoviesList, setCurerntPage, setSearchText } from "redux/slicers/movieSlicer";

const categories = [
  { id: 1, name: "movie" },
  { id: 2, name: "series" },
  { id: 3, name: "episode" },
  { id: 4, name: "favourites" },
];

const Categories = ({
  className = "flex flex-wrap justify-center space-x-4 px-3 py-4 text-xs font-bold text-white font-[fantasy] gap-2",
}: {
  className?: string;
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const currentPath = useMemo(() => getCurrentPath(location.pathname), [location.pathname]);

  const onCategoryClick = (type: CategoryType | "favourites") => {
    if (type === "favourites") {
      return;
    } else {
      dispatch(fetchMoviesList({ type, page: 1 }));
      dispatch(setCurerntPage(1));
      dispatch(setSearchText(""));
    }
  };

  return (
    <div className={className}>
      {categories.map((category) => (
        <Link
          key={category?.id}
          to={`/${category?.name}`}
          className={`${
            category?.name === currentPath
              ? "text-white-500 bg-red-500 px-2 rounded-full"
              : "hover:text-red-500 hover:scale-120 ease-in-out duration-500"
          }${category?.name === "favourites" ? " md:hidden" : ""}`}
          onClick={() =>
            category?.name !== currentPath ? onCategoryClick(category.name as CategoryType) : null
          }
        >
          {category?.name?.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
