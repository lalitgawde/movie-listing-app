import React from "react";
import styles from "./Stats.module.css";

function Stats({
  year,
  movies,
  imdbRating,
  userRating,
  runtime,
  isWatchComponent,
  isWatchStats,
  classes,
}) {
  return (
    <div className={styles.stats}>
      {!isWatchComponent && year && <span>📅 {year}</span>}
      {isWatchStats && <span>🎬 {movies} Movies</span>}
      {(isWatchComponent || isWatchStats) && <span>⭐ {imdbRating}</span>}
      {(isWatchComponent || isWatchStats) && <span>🌟 {userRating}</span>}
      {(isWatchComponent || isWatchStats) && <span>⏳ {runtime} min</span>}
      {isWatchComponent && <button className={classes}>X</button>}
    </div>
  );
}

export default Stats;
