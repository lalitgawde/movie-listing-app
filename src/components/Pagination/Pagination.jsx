// components/PaginationControls.jsx
function PaginationControls({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onGoTo,
  hasPrev,
  hasNext,
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2 mt-2">
      {/* Page context */}
      <span className="text-base text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="px-3! py-1! text-base rounded bg-[#2e3035] text-gray-300 cursor-pointer
                     disabled:opacity-30 disabled:cursor-not-allowed
                     hover:bg-[#3a3d42] transition-colors">
          ‹
        </button>

        {/* Page number buttons */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onGoTo(page)}
            className={`w-8 h-8 text-base rounded transition-colors cursor-pointer
              ${
                page === currentPage
                  ? "bg-purple-600 text-white font-semibold"
                  : "bg-[#2e3035] text-gray-400 hover:bg-[#3a3d42]"
              }`}>
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="px-3! py-1! text-base rounded bg-[#2e3035] text-gray-300 cursor-pointer
                     disabled:opacity-30 disabled:cursor-not-allowed
                     hover:bg-[#3a3d42] transition-colors">
          ›
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
