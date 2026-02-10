import React from "react";
import styles from "./Modal.module.css";
import MovieItem from "../MovieItem/MovieItem";

function Modal({ children, onClose }) {
  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}>
        <button className={styles["close-btn"]} onClick={onClose}>
          ×
        </button>
        <div className={styles["modal-content"]}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
