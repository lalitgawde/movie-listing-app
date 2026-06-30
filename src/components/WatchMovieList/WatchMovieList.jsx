import React, { useState } from "react";
import styles from "./WatchMovieList.module.css";
import Button from "../Button/Button";
import MovieItem from "../MovieItem/MovieItem";
import Stats from "../Stats/Stats";
import MovieDetail from "../MovieDetail/MovieDetail";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import DeleteModal from "../DeleteModal/DeleteModal";
import usePagination from "../../Hooks/usePagination";
import PaginationControls from "../Pagination/Pagination";

function WatchMovieList({ selectedId, handleCloseMovie }) {
  const [isListingVisible, setIsListingVisible] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState({
    show: false,
    id: null,
  });
  const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watchList");
  const {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasPrev,
    hasNext,
  } = usePagination(watchedMovies, 5);

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

  let modalDelete = null;

  if (showDeleteModal.show) {
    modalDelete = (
      <DeleteModal
        onClose={() => setShowDeleteModal({ show: false, id: null })}
        submitText="Delete"
        onSubmit={() => {
          onDeleteMovie(showDeleteModal.id);
          setShowDeleteModal({ show: false, id: null });
        }}
        showSubmit={true}>
        <p
          style={{
            color: "red",
            fontSize: "20px",
            fontWeight: "normal",
          }}>
          Are you sure, you want to delete this movie.
        </p>
      </DeleteModal>
    );
  }

  return (
    <>
      {modalDelete}
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
                {currentItems.map((movie) => (
                  <MovieItem
                    movie={movie}
                    isWatchComponent={true}
                    key={movie.imdbID}
                    onClick={(id) => setShowDeleteModal({ show: true, id })}
                  />
                ))}
              </ul>
              {/* Your own pagination UI — full control */}
              {totalPages > 1 && (
                <div className="bg-gray-600 px-4! py-4! rounded-b-lg">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNext={nextPage}
                    onPrev={prevPage}
                    onGoTo={goToPage}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                  />
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
}

export default WatchMovieList;
