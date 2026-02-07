import React from "react";
import styles from "./Button.module.css";

function Button({ children, classes }) {
  return (
    <button className={`${styles.minimise} ${classes}`}>{children}</button>
  );
}

export default Button;
