import React from "react";
import styles from "./MovieItem.module.css";
import Stats from "../Stats/Stats";

function MovieItem({ movie, isWatchComponent, onSelectMovie, onDeleteMovie }) {
  console.log(movie);
  return (
    <li
      className={styles.movieItem}
      onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />
      <div className={styles.details}>
        <h2>{movie.Title}</h2>
        <Stats
          year={movie.Year}
          imdbRating={movie.imdbRating}
          userRating={movie.userRating}
          runtime={movie.Runtime}
          isWatchComponent={isWatchComponent}
          classes={styles["btn-delete"]}
          onClick={() => onDeleteMovie(movie.imdbID)}
        />
      </div>
    </li>
  );
}

export default MovieItem;
