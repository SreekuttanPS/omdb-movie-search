import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "movie" },
  { id: 2, name: "series" },
  { id: 3, name: "episode" },
];

const Categories: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  return (
    <div className="flex flex-wrap justify-center space-x-4 px-3 py-4 text-xs font-bold text-white font-[fantasy] gap-2">
      {categories.map((category) => (
        <Link
          key={category?.id}
          to={`/${category?.name}`}
          className={
            category?.id === activeCategoryId
              ? "text-white-500 bg-red-500 px-2 rounded-full"
              : "hover:text-red-500 hover:scale-110"
          }
          onClick={() => setActiveCategoryId(category?.id)}
        >
          {category?.name?.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
