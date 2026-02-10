import { useEffect, useState } from "react";
import styles from "./MovieDetail.module.css";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";

function MovieDetail({
  selectedId,
  onAddWatchList,
  watchedMovies,
  handleCloseMovie,
}) {
  const [selectedMovieData, setSelectedMovieData] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const isWatched = watchedMovies.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  const onSetRating = (rating) => {
    setUserRating(rating);
  };

  useEffect(() => {
    console.log("Selected ID:", selectedId);
    async function getSelectedMovie(id) {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=79d86d9d`,
        );
        if (!response.ok) {
          throw new Error("Failed to get movie details");
        }
        const data = await response.json();
        console.log("data", data);
        setSelectedMovieData(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (selectedId) {
      getSelectedMovie(selectedId);
    }
  }, [selectedId]);
  console.log("");

  if (!selectedMovieData) {
    return <div className={styles["loading"]}>Loading...</div>;
  }

  const onAddWatch = () => {
    const updatedMovieData = {
      ...selectedMovieData,
      userRating,
    };
    onAddWatchList(updatedMovieData);
    handleCloseMovie();
  };

  return (
    <>
      <div className={styles["selected_movie_header"]}>
        <Button classes={styles["back-btn"]} onClick={handleCloseMovie}>
          ⬅️
        </Button>
        <img src={selectedMovieData.Poster} alt={selectedMovieData.Title} />
        <div className={styles["movie_overview"]}>
          <h3>{selectedMovieData.Title}</h3>
          <p>
            <span>{selectedMovieData.Released}</span> •{" "}
            <span>{selectedMovieData.Runtime}</span>
          </p>
          <p>{selectedMovieData.Genre}</p>
          <p>⭐ {selectedMovieData.imdbRating} IMDb rating</p>
        </div>
      </div>
      <section className={styles["selected_body_details"]}>
        {/* <div className={styles["rating"]}>
          {!isWatched ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  width: "100%",
                }}>
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (num) => {
                    return (
                      <Star
                        num={num}
                        size={"24"}
                        onAddRating={onSetRating}
                        onMouseOver={() => setTempRating(num)}
                        onMouseClose={() => setTempRating(0)}
                        key={num}
                        full={
                          tempRating ? tempRating >= num : userRating >= num
                        }
                      />
                    );
                  },
                )}
                <p
                  style={{
                    color: "#fcc419",
                    fontSize: "22px",
                    marginLeft: "8px",
                  }}>
                  {tempRating > 0
                    ? tempRating
                    : userRating > 0
                      ? userRating
                      : null}
                </p>
              </div>
              {userRating > 0 && (
              <button
                className={styles["btn-add"]}
                onClick={onAddWatch}
                disabled={!(userRating > 0)}>
                + Add to list
              </button>
              )} 
            </>
          ) : (
            <p>You have already rated this movie {watchedUserRating}/10</p>
          )}
        </div> */}
        <Rating
          isWatched={isWatched}
          onSetRating={onSetRating}
          tempRating={tempRating}
          userRating={userRating}
          onAddWatch={onAddWatch}
          watchedUserRating={watchedUserRating}
          setTempRating={setTempRating}
        />
        <p className={styles["plot"]}>
          <i>{selectedMovieData.Plot}</i>
        </p>
        <p>Starring {selectedMovieData.Actors}</p>
        <p>Directed by {selectedMovieData.Director}</p>
      </section>
    </>
  );
}

export default MovieDetail;
