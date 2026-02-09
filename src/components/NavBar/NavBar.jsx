import React from "react";
import styles from "./NavBar.module.css";

function NavBar({ search, onChange, count }) {
  return (
    <header className={styles.header}>
      <h2>🍿MovieList</h2>
      <input
        className={styles.search}
        placeholder="Search Movies..."
        value={search}
        onChange={onChange}
      />
      <span>Found {count} results</span>
    </header>
  );
}

export default NavBar;
