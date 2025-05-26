import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  console.log('currentPage: ', currentPage);

  const createPageRange = () => {
    if (totalPages <= 5) {
      return new Array(totalPages).fill(0).map((_, i) => i);
    } else {
      let paginteArray = [1, '...', totalPages];
      return paginteArray;
    }
  };

  const pages = createPageRange();

  return (
    <div className="flex items-center justify-center z-10 gap-1">
      {currentPage === 1 ? (
        <button
          onClick={() => handleClick(currentPage - 1)}
          className="w-[35px] h-[35px] cursor-pointer rounded-full bg-red-600/50"
        >
          &laquo;
        </button>
      ) : null}
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={`w-[35px] h-[35px] cursor-pointer rounded-full ${
              page === currentPage ? "bg-red-600" : "bg-red-600/50"
            }`}
          >
            {page}
          </button>
        ) : (
          <button
            key={index}
            className="w-[35px] h-[35px] cursor-pointer rounded-full bg-red-600/50"
          >
            {page}
          </button>
        )
      )}
      {!(currentPage === totalPages) ? (
        <button
          onClick={() => handleClick(currentPage + 1)}
          className="w-[35px] h-[35px] cursor-pointer rounded-full bg-red-600/50"
        >
          &raquo;
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
