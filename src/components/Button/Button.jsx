import React from "react";
import styles from "./Button.module.css";

function Button({ children, classes, ...props }) {
  return (
    <button className={`${styles.minimise} ${classes}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
