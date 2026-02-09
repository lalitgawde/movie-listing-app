import React from "react";
import styles from "./Modal.module.css";
import MovieItem from "../MovieItem/MovieItem";

function Modal({ movies, onClose }) {
  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["close-btn"]} onClick={onClose}>
          ×
        </button>
        <div className={styles["modal-content"]}>
          <h1>All Movie List</h1>
          <ul>
            {movies.map((movie) => (
              <MovieItem
                movie={movie}
                isWatchComponent={false}
                key={movie.imdbID}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
