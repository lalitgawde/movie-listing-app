import React, { useEffect, useRef, useState } from "react";
import styles from "./MovieList.module.css";
import Button from "../Button/Button";
import MovieItem from "../MovieItem/MovieItem";
import Modal from "../Modal/Modal";
import useFetch from "../../Hooks/useFetch";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import usePagination from "../../Hooks/usePagination";

function MovieList({ search, setCount, handleSelectMovie }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [movies, setMovies] = useState([]);
  const timerRef = React.useRef(null);
  const {
    response,
    loading,
    error,
    setResponse,
    fetchData: getMovies,
  } = useFetch("", [], "Failed to fetch movies", false);
  const controllerRef = useRef(null);
  const movies = response && response.Search ? response.Search : [];
  const [isListingVisible, setIsListingVisible] = useState(true);

  const paginationObj = usePagination(movies, 9);

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    if (search.length < 3) {
      setResponse([]);
      return;
    } else {
      timerRef.current = setTimeout(() => {
        getMovies(
          {},
          `https://www.omdbapi.com/?s=${search}&apikey=79d86d9d`,
          controllerRef,
        );
      }, 500);
    }
    return () => {
      // controller.abort();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [search, setCount, getMovies, setResponse]);

  useEffect(() => {
    if (response && response.Response === "False") {
      setCount(0);
    } else if (response && response.Search) {
      setCount(response.Search.length);
    }
  }, [response, setCount]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (
    error &&
    (error === "Failed to fetch movies" || error === "Movie not found!")
  ) {
    return <div className={`${styles.list} ${styles["error"]}`}>{error}</div>;
  }

  return (
    <div className={styles.list}>
      <Button
        classes={styles.minimise}
        onClick={() => setIsListingVisible((prevState) => !prevState)}>
        {isListingVisible ? "-" : "+"}
      </Button>
      {isModalVisible && (
        <Modal
          movies={movies}
          onClose={() => setIsModalVisible(false)}
          paginationProps={{ ...paginationObj }}>
          <h1>All Movie List</h1>
          <ul>
            {paginationObj.currentItems.map((movie) => (
              <MovieItem
                movie={movie}
                isWatchComponent={false}
                key={movie.imdbID}
                onSelectMovie={(id) => {
                  setIsModalVisible(false);
                  handleSelectMovie(id);
                }}
              />
            ))}
          </ul>
        </Modal>
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
      {isListingVisible && movies.length > 0 && (
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
