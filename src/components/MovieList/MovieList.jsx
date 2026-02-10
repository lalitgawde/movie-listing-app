import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import Button from "../Button/Button";
import MovieItem from "../MovieItem/MovieItem";
import Modal from "../Modal/Modal";

function MovieList({ search, setCount, handleSelectMovie }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isListingVisible, setIsListingVisible] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (search.length < 3) {
      setMovies([]);
      return;
    } else {
      getMovies();
    }

    async function getMovies() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${search}&apikey=79d86d9d`,
          { signal },
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
          setMovies([]);
          setCount(0);
          return;
        }
        setMovies(data.Search);
        setCount(data.Search.length);
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      controller.abort();
    };
  }, [search]);

  return (
    <div className={styles.list}>
      <Button
        classes={styles.minimise}
        onClick={() => setIsListingVisible((prevState) => !prevState)}>
        {isListingVisible ? "-" : "+"}
      </Button>
      {isModalVisible && (
        <Modal movies={movies} onClose={() => setIsModalVisible(false)} />
      )}
      {movies.length > 0 && (
        <p className={styles["movie-count"]}>
          Top 5 Movies, Click{" "}
          <button
            onClick={() => setIsModalVisible((prevState) => !prevState)}
            className={styles["view-more-btn"]}>
            here
          </button>{" "}
          to view more
        </p>
      )}
      {isListingVisible && (
        <ul>
          {movies.slice(0, 5).map((movie) => (
            <MovieItem
              movie={movie}
              isWatchComponent={false}
              key={movie.imdbID}
              onSelectMovie={handleSelectMovie}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
