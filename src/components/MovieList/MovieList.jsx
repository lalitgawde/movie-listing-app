import React from "react";
import styles from "./MovieList.module.css";
import Button from "../Button/Button";
import { tempMovieData } from "../../data";
import MovieItem from "../MovieItem/MovieItem";

function MovieList() {
  return (
    <div className={styles.list}>
      <Button classes={styles.minimise}>-</Button>
      <ul>
        {tempMovieData.map((movie) => (
          <MovieItem movie={movie} isWatchComponent={false} />
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
