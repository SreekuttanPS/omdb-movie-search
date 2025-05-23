import React, { useState } from "react";

const categories = [
  { id: 1, name: "MYSTERY" },
  { id: 2, name: "ACTION" },
  { id: 3, name: "COMEDY" },
  { id: 4, name: "SCI-FI" },
  { id: 5, name: "HORROR" },
  { id: 6, name: "FANTASY" },
  { id: 7, name: "DRAMA" },
  { id: 8, name: "ROMANCE" },
];

const Categories: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  return (
    <div className="flex flex-wrap justify-center space-x-4 px-3 py-4 text-xs font-bold text-white font-[fantasy] gap-2">
      {categories.map((category) => (
        <a
          key={category?.id}
          href="#"
          className={
            category?.id === activeCategoryId
              ? "text-white-500 bg-red-500 px-2 rounded-full"
              : "hover:text-red-500 hover:scale-110"
          }
          onClick={() => setActiveCategoryId(category?.id)}
        >
          {category?.name}
        </a>
      ))}
    </div>
  );
};

export default Categories;
