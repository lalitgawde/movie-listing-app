import React from "react";
import styles from "./DeleteModal.module.css";

function DeleteModal({
  children,
  showSubmit = false,
  onClose,
  onSubmit,
  submitText,
}) {
  return (
    <div className={styles["deleteModal-overlay"]}>
      <div className={styles["deleteModal-container"]}>
        <div className={styles["deleteModal-content"]}>{children}</div>
        <div className={styles["deleteModal-actions"]}>
          {showSubmit && (
            <button onClick={onSubmit} className={styles["btn-ok"]}>
              {submitText}
            </button>
          )}
          <button onClick={onClose} className={styles["btn-cancel"]}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
