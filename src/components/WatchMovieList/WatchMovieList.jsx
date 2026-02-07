import React from "react";
import styles from "./WatchMovieList.module.css";
import Button from "../Button/Button";
import { tempWatchedData } from "../../data";
import MovieItem from "../MovieItem/MovieItem";
import Stats from "../Stats/Stats";

function WatchMovieList() {
  const length = tempWatchedData.length;
  const imdbRating = Math.round(
    tempWatchedData.reduce((acc, movie) => acc + movie.imdbRating, 0) / length,
  );
  const userRating = Math.round(
    tempWatchedData.reduce((acc, movie) => acc + movie.userRating, 0) / length,
  );
  const runtime = Math.round(
    tempWatchedData.reduce((acc, movie) => acc + movie.runtime, 0) / length,
  );

  return (
    <div className={styles["watchList"]}>
      <Button classes={styles.minimise}>-</Button>
      <div className={styles["watchList-header"]}>
        <h3>Movies You Watched</h3>
        <Stats
          movies={length}
          imdbRating={imdbRating}
          userRating={userRating}
          runtime={runtime}
          isWatchStats={true}
          classes={styles["btn-delete"]}
        />
      </div>
      <ul>
        {tempWatchedData.map((movie) => (
          <MovieItem movie={movie} isWatchComponent={true} />
        ))}
      </ul>
    </div>
  );
}

export default WatchMovieList;
