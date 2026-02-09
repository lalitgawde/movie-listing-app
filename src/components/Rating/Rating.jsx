import Star from "../Star/Star";
import styles from "./Rating.module.css";

function Rating({
  isWatched,
  onSetRating,
  tempRating,
  userRating,
  onAddWatch,
  watchedUserRating,
  setTempRating,
}) {
  return (
    <div className={styles["rating"]}>
      {!isWatched ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              width: "100%",
            }}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((num) => {
              return (
                <Star
                  num={num}
                  size={"24"}
                  onAddRating={onSetRating}
                  onMouseOver={() => setTempRating(num)}
                  onMouseClose={() => setTempRating(0)}
                  key={num}
                  full={tempRating ? tempRating >= num : userRating >= num}
                />
              );
            })}
            <p
              style={{
                color: "#fcc419",
                fontSize: "22px",
                marginLeft: "8px",
              }}>
              {tempRating > 0 ? tempRating : userRating > 0 ? userRating : null}
            </p>
          </div>
          {/* {userRating > 0 && ( */}
          <button
            className={styles["btn-add"]}
            onClick={onAddWatch}
            disabled={!(userRating > 0)}>
            + Add to list
          </button>
          {/* )} */}
        </>
      ) : (
        <p
          style={{
            marginRight: "20px",
          }}>
          You have already rated this movie {watchedUserRating}/10
        </p>
      )}
    </div>
  );
}

export default Rating;
