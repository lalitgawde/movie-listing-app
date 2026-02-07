import React from "react";
import styles from "./NavBar.module.css";

function NavBar({ search, onChange }) {
  return (
    <header className={styles.header}>
      <h2>🍿MovieList</h2>
      <input
        className={styles.search}
        placeholder="Search Movies..."
        value={search}
        onChange={onChange}
      />
      <span>Found 3 results</span>
    </header>
  );
}

export default NavBar;
