import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { id: 1, name: "movie" },
  { id: 2, name: "series" },
  { id: 3, name: "episode" },
];

const Categories = () => {
  const location = useLocation();

  const currentPath = useMemo(() => {
    if (location.pathname?.includes("/series")) {
      return "series";
    } else if (location.pathname?.includes("/episode")) {
      return "episode";
    } else return "movie";
  }, [location.pathname]);

  return (
    <div className="flex flex-wrap justify-center space-x-4 px-3 py-4 text-xs font-bold text-white font-[fantasy] gap-2">
      {categories.map((category) => (
        <Link
          key={category?.id}
          to={`/${category?.name}?page=1`}
          className={
            category?.name === currentPath
              ? "text-white-500 bg-red-500 px-2 rounded-full"
              : "hover:text-red-500 hover:scale-110"
          }
        >
          {category?.name?.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
