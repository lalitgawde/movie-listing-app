import React from "react";
import styles from "./NavBar.module.css";
import Button from "../Button/Button";

function NavBar({ search, onChange, count, handleClearSearch }) {
  return (
    <header className={styles.header}>
      <h2>🍿MovieList</h2>
      <div style={{ position: "relative" }}>
        <input
          className={styles.search}
          placeholder="Search Movies..."
          value={search}
          onChange={onChange}
        />
        {search && (
          <Button classes={styles.crossBtn} onClick={handleClearSearch}>
            X
          </Button>
        )}
      </div>
      <span>Found {count} results</span>
    </header>
  );
}

export default NavBar;
