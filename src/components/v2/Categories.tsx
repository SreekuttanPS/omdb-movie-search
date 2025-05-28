import { CategoryType } from "helpers/sharedTypes";
import { getCurrentPath } from "helpers/utils";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "redux/redux-hooks";
import { fetchMoviesList } from "redux/slicers/movieSlicer";

const categories = [
  { id: 1, name: "movie" },
  { id: 2, name: "series" },
  { id: 3, name: "episode" },
];

const Categories = () => {
  const location = useLocation();
  const dispatch = useAppDispatch()

  const currentPath = useMemo(() => getCurrentPath(location.pathname), [location.pathname]);

  const onCategoryClick = (type: CategoryType) => {
    dispatch(
      fetchMoviesList({
        type,
        page: 1,
      })
    );
  };

  return (
    <div className="flex flex-wrap justify-center space-x-4 px-3 py-4 text-xs font-bold text-white font-[fantasy] gap-2">
      {categories.map((category) => (
        <Link
          key={category?.id}
          to={`/${category?.name}`}
          className={
            category?.name === currentPath
              ? "text-white-500 bg-red-500 px-2 rounded-full"
              : "hover:text-red-500 hover:scale-110"
          }
          onClick={() => onCategoryClick(category.name as CategoryType)}
        >
          {category?.name?.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
