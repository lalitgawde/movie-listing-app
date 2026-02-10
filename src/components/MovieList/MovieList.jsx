import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import Button from "../Button/Button";
import MovieItem from "../MovieItem/MovieItem";
import Modal from "../Modal/Modal";
import useFetch from "../../Hooks/useFetch";

function MovieList({ search, setCount, handleSelectMovie }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [movies, setMovies] = useState([]);
  const {
    response,
    loading,
    error,
    setResponse,
    fetchData: getMovies,
  } = useFetch("", [], "Failed to fetch movies", false);
  const movies = response && response.Search ? response.Search : [];
  const [isListingVisible, setIsListingVisible] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (search.length < 3) {
      setResponse([]);
      return;
    } else {
      getMovies(
        { signal },
        `https://www.omdbapi.com/?s=${search}&apikey=79d86d9d`,
      );
    }
    // async function getMovies() {
    //   try {
    //     const response = await fetch(
    //       `https://www.omdbapi.com/?s=${search}&apikey=79d86d9d`,
    //       { signal },
    //     );

    //     if (!response.ok) {
    //       throw new Error("Failed to fetch movies");
    //     }

    //     const data = await response.json();
    //     console.log(data);
    //     if (data.Response === "False") {
    //       setMovies([]);
    //       setCount(0);
    //       return;
    //     }
    //     setMovies(data.Search);
    //     setCount(data.Search.length);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    return () => {
      controller.abort();
    };
  }, [search, setCount, getMovies, setResponse]);

  useEffect(() => {
    if (response && response.Response === "False") {
      setResponse([]);
      setCount(0);
    } else if (response && response.Search) {
      setCount(response.Search.length);
    }
  }, [response, setResponse, setCount]);

  if (loading) {
    return <div className={styles["loading"]}>Loading...</div>;
  }

  if (error && error === "Failed to fetch movies") {
    return <div className={styles["error"]}>{error}</div>;
  }

  return (
    <div className={styles.list}>
      <Button
        classes={styles.minimise}
        onClick={() => setIsListingVisible((prevState) => !prevState)}>
        {isListingVisible ? "-" : "+"}
      </Button>
      {isModalVisible && (
        <Modal movies={movies} onClose={() => setIsModalVisible(false)}>
          <h1>All Movie List</h1>
          <ul>
            {movies.map((movie) => (
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
