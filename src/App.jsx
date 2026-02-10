import { useState } from "react";
import MovieList from "./components/MovieList/MovieList";
import NavBar from "./components/NavBar/NavBar";
import WatchMovieList from "./components/WatchMovieList/WatchMovieList";

// http://www.omdbapi.com/?i=tt3896198&apikey=79d86d9d
function App() {
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0);

  function InputChangeHandler(e) {
    setSearchInput(e.target.value);
  }

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleClearSearch() {
    setSearchInput("");
  }

  return (
    <div className="app">
      <NavBar
        search={searchInput}
        onChange={InputChangeHandler}
        count={count}
        handleClearSearch={handleClearSearch}
      />
      <main className="main">
        <MovieList
          search={searchInput}
          setCount={setCount}
          handleSelectMovie={handleSelectMovie}
        />
        <WatchMovieList
          selectedId={selectedId}
          handleCloseMovie={handleCloseMovie}
        />
      </main>
      <footer className="footer">
        <p>© 2026 Movie Listing App</p>
      </footer>
    </div>
  );
}

export default App;
