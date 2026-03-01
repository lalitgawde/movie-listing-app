import React, { useState } from "react";
import styles from "./WatchMovieList.module.css";
import Button from "../Button/Button";
import MovieItem from "../MovieItem/MovieItem";
import Stats from "../Stats/Stats";
import MovieDetail from "../MovieDetail/MovieDetail";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

function WatchMovieList({ selectedId, handleCloseMovie }) {
  const [isListingVisible, setIsListingVisible] = useState(true);
  const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watchList");

  const length = watchedMovies.length;
  let imdbRating = 0;
  let userRating = 0;
  let runtime = 0;
  if (length > 0) {
    imdbRating = Math.round(
      watchedMovies.reduce((acc, movie) => acc + Number(movie.imdbRating), 0) /
        length,
    );
    userRating = Math.round(
      watchedMovies.reduce((acc, movie) => acc + movie.userRating, 0) / length,
    );
    runtime = Math.round(
      watchedMovies.reduce(
        (acc, movie) => acc + Number(movie.Runtime.split(" ")[0]),
        0,
      ) / length,
    );
  }

  const onAddWatchList = (movie) => {
    setWatchedMovies((prevMovies) => [...prevMovies, movie]);
  };

  const onDeleteMovie = (id) => {
    setWatchedMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== id),
    );
  };

  return (
    <div
      className={styles["watchList"]}
      // style={!selectedId ? { overflow: "auto" } : {}}
    >
      <Button
        classes={styles.minimise}
        onClick={() => setIsListingVisible((prevState) => !prevState)}>
        {isListingVisible ? "-" : "+"}
      </Button>
      {isListingVisible &&
        (selectedId ? (
          <MovieDetail
            selectedId={selectedId}
            handleCloseMovie={handleCloseMovie}
            onAddWatchList={onAddWatchList}
            watchedMovies={watchedMovies}
          />
        ) : (
          <>
            <div className={styles["watchList-header"]}>
              <h3>Movies You Watched</h3>
              <Stats
                movies={length}
                imdbRating={imdbRating}
                userRating={userRating}
                runtime={`${runtime} min`}
                isWatchStats={true}
                classes={styles["btn-delete"]}
              />
            </div>
            <ul>
              {watchedMovies.map((movie) => (
                <MovieItem
                  movie={movie}
                  isWatchComponent={true}
                  key={movie.imdbID}
                  onDeleteMovie={onDeleteMovie}
                />
              ))}
            </ul>
          </>
        ))}
    </div>
  );
}

export default WatchMovieList;
