// hooks/usePagination.js
import { useState, useMemo } from "react";

function usePagination(data = [], itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data for the current page
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  function goToPage(page) {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }

  function nextPage() {
    goToPage(currentPage + 1);
  }
  function prevPage() {
    goToPage(currentPage - 1);
  }

  // Reset to page 1 whenever data changes (new search, new filter etc.)
  // Call this manually or put it in a useEffect in your component
  function reset() {
    setCurrentPage(1);
  }

  return {
    currentItems, // ← the sliced data to render
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    reset,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export default usePagination;
