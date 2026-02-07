import React from "react";
import styles from "./MovieItem.module.css";
import Stats from "../Stats/Stats";

function MovieItem({ movie, isWatchComponent }) {
  return (
    <li className={styles.movieItem}>
      <img src={movie.Poster} alt={movie.Title} />
      <div className={styles.details}>
        <h2>{movie.Title}</h2>
        <Stats
          year={movie.Year}
          imdbRating={movie.imdbRating}
          userRating={movie.userRating}
          runtime={movie.runtime}
          isWatchComponent={isWatchComponent}
          classes={styles["btn-delete"]}
        />
      </div>
    </li>
  );
}

export default MovieItem;
