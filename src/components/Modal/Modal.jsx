import React from "react";
import styles from "./Modal.module.css";
import MovieItem from "../MovieItem/MovieItem";
import PaginationControls from "../Pagination/Pagination";

function Modal({ children, onClose, paginationProps }) {
  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}>
        <button className={styles["close-btn"]} onClick={onClose}>
          ×
        </button>
        <div className={styles["modal-content"]}>{children}</div>
        {paginationProps?.totalPages > 1 && (
          <div className="bg-gray-600 px-4! py-4! rounded-b-lg">
            <PaginationControls
              currentPage={paginationProps.currentPage}
              totalPages={paginationProps.totalPages}
              onNext={paginationProps.nextPage}
              onPrev={paginationProps.prevPage}
              onGoTo={paginationProps.goToPage}
              hasPrev={paginationProps.hasPrev}
              hasNext={paginationProps.hasNext}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
