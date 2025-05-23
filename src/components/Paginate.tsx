import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
}) => {
  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const createPageRange = () => {
    const pages: (number | string)[] = [];

    const startPage = Math.max(
      currentPage - Math.floor(pageRangeDisplayed / 2),
      marginPagesDisplayed + 1
    );
    const endPage = Math.min(startPage + pageRangeDisplayed - 1, totalPages - marginPagesDisplayed);

    // Left margin
    for (let i = 1; i <= marginPagesDisplayed; i++) {
      pages.push(i);
    }

    if (startPage > marginPagesDisplayed + 1) {
      pages.push("...");
    }

    // Main page range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - marginPagesDisplayed) {
      pages.push("...");
    }

    // Right margin
    for (let i = totalPages - marginPagesDisplayed + 1; i <= totalPages; i++) {
      if (i > marginPagesDisplayed && i > endPage) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = createPageRange();

  return (
    <nav className="flex">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo;
      </button>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={`pagination-button ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="pagination-ellipsis">
            {page}
          </span>
        )
      )}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
