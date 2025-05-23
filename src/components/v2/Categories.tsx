import React from "react";

    const categories = [
      "MYSTERY",
      "ACTION",
      "COMEDY",
      "SCI-FI",
      "HORROR",
      "FANTASY",
      "DRAMA",
      "ROMANCE",
    ];

    const activeCategory = "SCI-FI";

    const Categories: React.FC = () => (
      <div className="flex flex-wrap justify-center space-x-4 py-4 text-xs font-bold text-white">
        {categories.map((category) => (
          <a
            key={category}
            href="#"
            className={
              category === activeCategory
                ? "text-red-500 border-b-2 border-red-500"
                : "hover:text-red-500"
            }
          >
            {category}
          </a>
        ))}
      </div>
    );

    export default Categories;