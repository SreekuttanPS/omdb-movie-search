import React, { ChangeEvent, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [selectedValue, setSelectedValue] = useState(currentPage);

  const selectFieldOptions = new Array(totalPages).fill(0).map((_, i) => ({
    page: i + 1,
    name: `Page ${i + 1}`,
  }));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(event.target.value))
    if (!isNaN(Number(event.target.value))) {
      onPageChange(Number(event.target.value));
    } else {
      onPageChange(1);
    }
  };

  return (
    <div className="flex items-center justify-center z-10 gap-2 bg-red-600/70 px-1 rounded-md shadow-xl">
      <select
        name="pageSelect"
        id="pageSelect"
        className="bg-red-600 my-2 rounded-md"
        value={selectedValue}
        onChange={(e) => handleChange(e)}
      >
        {selectFieldOptions?.map((option) => (
          <option value={option.page} key={option.page}>
            {option?.name}
          </option>
        ))}
      </select>{" "}
      of {totalPages} pages
    </div>
  );
};

export default Pagination;
